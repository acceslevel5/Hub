import { useEffect, useRef, useState } from 'react'
import styles from './HubOnboarding.module.css'
import hubIcon from '../../assets/icons/tab-hub.svg'
import handIcon from '../../assets/illustrations/hand-select.svg'
import { ONBOARDING_COPY, ONBOARDING_EYEBROW } from '../../config/onboarding'

/*
 * Hub-ის ონბორდინგი (docs/onboarding-spec.md, მოძრაობა — docs/onboarding-concept.html).
 * ეკრანის (Screen) თავზე ფენაა; ნავბარს/ტაბ ბარს მშობელი მართავს callback-ებით:
 *   onToolbarCollapse — Hub ტაბი იკეცება, onLand — ნავბარი ახალ განლაგებაზე გადადის,
 *   onTipClosed — ჰინტი დაიხურა (აპი ჩვეულებრივად მუშაობს), onSwipeHint — სვაიპის მინიშნება იწყება/მთავრდება,
 *   onCta — CTA-ზე დაჭერა (Tip-ის დახურვამდე), onFinish(openHub) — ონბორდინგი დასრულდა.
 * ფრენის კოორდინატები რეალური DOM-იდან (data-onb ატრიბუტები), არა hardcode-ით.
 */
// პაუზა გვერდის გახსნიდან ტურის დაწყებამდე, რომ იუზერმა ჯერ ძველი განლაგება შეამჩნიოს
const START_DELAY = 600

const T = {
  scrim: 700,
  pulse: 650, // ორი „გაბერვა" 700–1350ms-ში, ფრენამდე
  flight: 1400,
  flightDuration: 850,
  qrSlide: 450,
  searchDelay: 80,
  tabCollapse: 300,
  land: 1400 + 860,
  tip: 3000,
  sheetOut: 300,
  swipeHint: 1100,
}
const TIP_CLOSE_DELAY = 80
const FLIGHT_EASING = 'cubic-bezier(.45,0,.2,1)'

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function HubOnboarding({ copyKey = 'a', onToolbarCollapse, onLand, onTipClosed, onSwipeHint, onCta, onFinish }) {
  const copy = ONBOARDING_COPY[copyKey] || ONBOARDING_COPY.a
  const rootRef = useRef(null)
  const scrimRef = useRef(null)
  const flyerRef = useRef(null)
  const ringRef = useRef(null)
  const gestureRef = useRef(null)
  const timers = useRef([])
  const [scrimBox, setScrimBox] = useState(null)
  const [tipOpen, setTipOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const reduced = useRef(reducedMotion())

  const later = (ms, fn) => timers.current.push(setTimeout(fn, ms))

  useEffect(() => {
    const screen = rootRef.current.parentElement
    const q = (sel) => screen.querySelector(sel)
    const rel = (el) => {
      const s = screen.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return { left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height }
    }

    // scrim: მხოლოდ Nav Bar-სა და ტაბ ბარს შორის
    const header = q(':scope > header')
    const toolbar = q(':scope > nav')
    const sRect = screen.getBoundingClientRect()
    setScrimBox({
      top: header.getBoundingClientRect().bottom - sRect.top,
      bottom: sRect.bottom - toolbar.getBoundingClientRect().top,
    })

    const fadeScrim = (to) =>
      scrimRef.current?.animate([{ opacity: to ? 0 : 1 }, { opacity: to ? 1 : 0 }], { duration: 400, fill: 'forwards' })

    // 2. 700ms — scrim; Hub ტაბის აიქონი ნარინჯისფერდება და ორჯერ დიდდება (იგივე ელემენტი შემდეგ მიფრინავს)
    later(START_DELAY + T.scrim, () => {
      fadeScrim(true)
      const hubTabIcon = q('[data-onb="hub-tab-icon"]')
      if (reduced.current || !hubTabIcon) return
      const from = rel(hubTabIcon)
      const flyer = flyerRef.current
      Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, display: 'block' })
      hubTabIcon.style.visibility = 'hidden'
      flyer.animate([{ backgroundColor: 'var(--text-helper)' }, { backgroundColor: 'var(--text-accent)' }], {
        duration: 200,
        easing: 'ease-out',
      })
      flyer.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)', offset: 0.25 },
          { transform: 'scale(1)', offset: 0.5 },
          { transform: 'scale(1.3)', offset: 0.75 },
          { transform: 'scale(1.15)' },
        ],
        { duration: T.pulse, easing: 'ease-in-out', fill: 'forwards' },
      )
    })

    // 3. 1400ms — Hub-ის აიქონი რკალით მიფრინავს ზედა მარცხენა ღილაკში
    later(START_DELAY + T.flight, () => {
      const hubTabIcon = q('[data-onb="hub-tab-icon"]')
      const navLeft = q('[data-onb="nav-left"]')
      const navSearch = q('[data-onb="nav-search"]')
      if (!hubTabIcon || !navLeft || !navSearch) return

      if (reduced.current) {
        // prefers-reduced-motion: ფრენის ნაცვლად crossfade
        onToolbarCollapse()
        ;[navLeft, navSearch].forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }))
        later(200, () => land(true))
        return
      }

      // flyer უკვე Hub ტაბის აიქონის ადგილასაა (ნაბიჯი 2)
      const flyer = flyerRef.current
      const from = { left: parseFloat(flyer.style.left), top: parseFloat(flyer.style.top) }
      const to = rel(navLeft.querySelector('img'))
      flyer.getAnimations().forEach((a) => a.cancel())
      const dx = to.left - from.left
      const dy = to.top - from.top
      flyer.animate(
        [
          { transform: 'translate(0,0) scale(1.15)' },
          { transform: `translate(${dx * 0.45}px,${dy * 0.75}px) scale(1.6) rotate(-14deg)`, offset: 0.5 },
          { transform: `translate(${dx}px,${dy}px) scale(1)` },
        ],
        { duration: T.flightDuration, easing: FLIGHT_EASING, fill: 'forwards' },
      )

      // QR მარცხნიდან ძიების ადგილას გადაცურდება
      const shift = rel(navSearch).left - rel(navLeft).left
      navLeft.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${shift}px)` }], {
        duration: T.qrSlide,
        easing: 'ease-in-out',
        fill: 'forwards',
      })
      // ძიება თავის ადგილზე მცირდება და ქრება (მარცხნივ არ მოძრაობს)
      later(T.searchDelay, () =>
        navSearch.animate([{ transform: 'none', opacity: 1 }, { transform: 'scale(.4)', opacity: 0 }], {
          duration: T.qrSlide,
          easing: 'ease',
          fill: 'forwards',
        }),
      )
      // +300ms — Hub ტაბი ტაბ ბარში იკეცება
      later(T.tabCollapse, onToolbarCollapse)
      later(T.land - T.flight, () => land(false))
    })

    // 4. დაშვება — ახალი Hub+Search აიქონი bounce-ით და პულსირებადი რგოლით
    const land = (crossfade) => {
      flyerRef.current.style.display = 'none'
      ;['[data-onb="nav-left"]', '[data-onb="nav-search"]'].forEach((sel) =>
        q(sel)?.getAnimations().forEach((a) => a.cancel()),
      )
      const hubTabIcon = q('[data-onb="hub-tab-icon"]')
      if (hubTabIcon) {
        hubTabIcon.getAnimations().forEach((a) => a.cancel())
        hubTabIcon.style.visibility = ''
      }
      onLand()
      // ნავბარის ხელახლა დახატვის შემდეგ
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const navLeft = q('[data-onb="nav-left"]')
          const navSearch = q('[data-onb="nav-search"]')
          if (!navLeft) return
          if (crossfade) {
            ;[navLeft, navSearch].forEach((el) => el?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }))
            return
          }
          navLeft.animate([{ transform: 'scale(.7)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], {
            duration: 420,
            easing: 'ease-out',
          })
          const r = rel(navLeft)
          const ring = ringRef.current
          Object.assign(ring.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` })
          ring.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.9)' }], {
            duration: 900,
            iterations: 2,
            easing: 'ease-out',
          })
        }),
      )
    }

    // 5. 3000ms — Tip bottom sheet
    later(START_DELAY + T.tip, () => setTipOpen(true))

    const all = timers.current
    return () => all.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 6. CTA — Tip ჩადის, scrim ქრება, შემდეგ სვაიპის მინიშნება (ან copy=b-ზე Hub იხსნება)
  const closeTip = () => {
    if (closing) return
    setClosing(true)
    // ჯერ URL იცვლება (Useberry ტურის ეკრანს მისი დატოვების მომენტში იღებს — ღია Tip-ით, სადაც ქლიქი მოხდა),
    // Tip კი ოდნავ მოგვიანებით იხურება
    onCta?.()
    later(TIP_CLOSE_DELAY, closeTipNow)
  }

  const closeTipNow = () => {
    setTipOpen(false)
    scrimRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.sheetOut, fill: 'forwards' })
    onTipClosed()

    if (copy.opensHub) {
      later(T.sheetOut, () => onFinish(true))
      return
    }
    if (reduced.current) {
      later(T.sheetOut, () => onFinish(false))
      return
    }
    later(450, () => {
      onSwipeHint(true)
      const screen = rootRef.current.parentElement
      const main = screen.querySelector(':scope > main') // არა Hub-ის კონტენტი ქვედა ფენაში
      main.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(0)', offset: 0.25 },
          { transform: 'translateX(56px)', offset: 0.65 },
          { transform: 'translateX(0)' },
        ],
        { duration: T.swipeHint, easing: 'ease-in-out' },
      )
      gestureRef.current.animate(
        [
          { opacity: 0, transform: 'translateX(-30px)' },
          { opacity: 1, transform: 'translateX(-30px)', offset: 0.2 },
          { opacity: 1, transform: 'translateX(50px)', offset: 0.7 },
          { opacity: 0, transform: 'translateX(50px)' },
        ],
        { duration: T.swipeHint, easing: 'ease-in-out' },
      ).onfinish = () => {
        onSwipeHint(false)
        onFinish(false)
      }
    })
  }

  return (
    <div className={styles.root} ref={rootRef} aria-live="polite">
      {scrimBox && <div ref={scrimRef} className={styles.scrim} style={scrimBox} />}
      <span ref={flyerRef} className={styles.flyer} style={{ maskImage: `url("${hubIcon}")`, WebkitMaskImage: `url("${hubIcon}")` }} />
      <span ref={ringRef} className={styles.ring} />

      <div className={`${styles.sheet} ${tipOpen ? styles.sheetOpen : ''} ${reduced.current ? styles.noMotion : ''}`} role="dialog" aria-hidden={!tipOpen}>
        <div className={styles.handle} />
        <div className={styles.badgeSlot}>
          <span className={styles.badge}>{ONBOARDING_EYEBROW}</span>
        </div>
        <div className={styles.content}>
          <p className="t-subtitle-large">{copy.title}</p>
          <p className={`t-body-medium ${styles.description}`}>{copy.text}</p>
        </div>
        <div className={styles.sticky}>
          <button type="button" className={`${styles.cta} t-label-large pressable`} onClick={closeTip} tabIndex={tipOpen ? 0 : -1}>
            {copy.cta}
          </button>
        </div>
      </div>

      {/* სვაიპის მინიშნება (Figma 3178:102450): კვალი, შეხების წერტილი და თითი */}
      <div ref={gestureRef} className={styles.gesture} aria-hidden="true">
        <span className={styles.trail} />
        <span className={styles.touchOuter} />
        <span className={styles.touchInner} />
        <img className={styles.hand} src={handIcon} width="77" height="77" alt="" />
      </div>
    </div>
  )
}
