import { useEffect, useRef } from 'react'
import styles from './Carousel.module.css'

/*
 * ჰორიზონტალური კარუსელი:
 * - ტელეფონზე: ნატიური სქროლი + scroll-snap (ბარათი თავის ადგილზე „ჯდება")
 * - დესკტოპზე (რისერჩერებისთვის): მაუსით გადათრევა იმპულსით და snap-ით;
 *   გადათრევის შემდეგ ბარათზე შემთხვევითი click არ ხდება
 * ელემენტების დაშორება/padding გადაეცემა className-ით.
 */
const DRAG_THRESHOLD = 5

export default function Carousel({ className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let drag = null // { x, left, lastX, lastT, v, moved }

    const snapTargets = () => {
      const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
      const max = el.scrollWidth - el.clientWidth
      return Array.from(el.children, (c) => Math.min(max, Math.max(0, c.offsetLeft - pad)))
    }

    const onDown = (e) => {
      if (e.button !== 0) return
      drag = { x: e.clientX, left: el.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false }
    }
    const onMove = (e) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) < DRAG_THRESHOLD) return
      if (!drag.moved) {
        drag.moved = true
        el.classList.add(styles.dragging)
      }
      const now = performance.now()
      drag.v = (e.clientX - drag.lastX) / Math.max(8, now - drag.lastT)
      drag.lastX = e.clientX
      drag.lastT = now
      el.scrollLeft = drag.left - dx
      e.preventDefault()
    }
    const onUp = () => {
      if (!drag) return
      const { moved, v, lastT } = drag
      drag = null
      if (!moved) return
      // იმპულსი: გადათრევის სიჩქარის მიხედვით ცოტა წინ (მაქს. ~ერთი ეკრანი), შემდეგ უახლოეს ბარათზე
      const velocity = performance.now() - lastT > 100 ? 0 : Math.max(-2, Math.min(2, v))
      const fling = Math.max(-el.clientWidth * 0.8, Math.min(el.clientWidth * 0.8, velocity * 220))
      const projected = el.scrollLeft - fling
      const targets = snapTargets()
      const target = targets.reduce((a, b) => (Math.abs(b - projected) < Math.abs(a - projected) ? b : a), 0)
      el.scrollTo({ left: target, behavior: 'smooth' })
      setTimeout(() => {
        // fallback, თუ smooth სქროლი ვერ შესრულდა (მაგ. ფონურ ტაბში)
        if (Math.abs(el.scrollLeft - target) > 1) el.scrollLeft = target
        el.classList.remove(styles.dragging)
      }, 450)
      const block = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
      }
      window.addEventListener('click', block, { capture: true, once: true })
      setTimeout(() => window.removeEventListener('click', block, { capture: true }), 0)
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div ref={ref} className={`${styles.carousel} ${className}`}>
      {children}
    </div>
  )
}
