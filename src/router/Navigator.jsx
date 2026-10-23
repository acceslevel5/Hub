import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './Navigator.module.css'
import { useHiddenReset } from './useHiddenReset'

/*
 * მარტივი stack-ნავიგატორი GitHub Pages-ისთვის. ეკრანი URL-ის ?screen= პარამეტრშია და არა hash-ში:
 *   Useberry ქლიქებს ეკრანებად URL-ით ჰყოფს და hash-ს უგულებელყოფს (ჰითმეფები ყველა ეკრანისთვის ერთ სქრინზე ჯდებოდა).
 * - navigate(path) → push ანიმაცია, back() → pop ანიმაცია (iOS-ის მსგავსად)
 * - ყველა ეკრანი სტეკში mounted რჩება, ამიტომ უკან დაბრუნებისას სქროლი და მდგომარეობა ინახება
 * - navigate(path, { replace: true }) → push ანიმაცია, შემდეგ წინა ეკრანები სტეკიდან ქრება (მაგ. პრელოგინი → მთავარი)
 * - reset() → საწყის ეკრანზე დაბრუნება და ყველა მდგომარეობის გასუფთავება (remount)
 * - ?screen=X ლინკით ჩატვირთვა ამ ეკრანს ხსნის (მთავარი გვერდი ქვეშ რჩება „უკან"-ისთვის):
 *   Useberry ჰითმეფის სქრინშოტისთვის თითოეული ეკრანის URL-ს თავიდან ტვირთავს
 */

const NavContext = createContext(null)
export const useNav = () => useContext(NavContext)

let uid = 0
// from: 'right' (iOS push) ან 'left' (მაგ. Hub, რომელიც მარცხნიდან შემოდის)
const entry = (path, from = 'right') => ({ key: ++uid, path, from })
// საწყისი ეკრანი → ?screen-ის გარეშე, '/' → ?screen=home, '/hub' → ?screen=hub; სხვა პარამეტრები (onboarding, copy) რჩება, ძველი #/ ქრება
const urlFor = (path, initialPath) => {
  const params = new URLSearchParams(window.location.search)
  if (path === initialPath) params.delete('screen')
  else params.set('screen', path === '/' ? 'home' : path.slice(1))
  const query = params.toString()
  return window.location.pathname + (query ? '?' + query : '')
}
const pathFromUrl = (initialPath) => {
  const screen = new URLSearchParams(window.location.search).get('screen')
  if (!screen) return initialPath
  return screen === 'home' ? '/' : '/' + screen
}

// ლინკით გახსნილი ეკრანის სტეკი: [ეკრანი] ან [მთავარი, ეკრანი]; rootPaths — ეკრანები, რომლებსაც მთავარი ქვეშ არ სჭირდება
const stackFromUrl = (routes, initialPath, enterFrom, rootPaths) => {
  const path = pathFromUrl(initialPath)
  if (!routes[path] || path === initialPath) return [entry(initialPath)]
  if (path === '/' || rootPaths.includes(path)) return [entry(path)]
  return [entry('/'), entry(path, enterFrom[path])]
}

// Useberry ახალ ეკრანს (NAVIGATION) DOM-ში ნოუდის დამატებისას ამოწმებს; replaceUrl-ის შემდეგ უხილავ comment-ს ვამატებთ
const pingUseberry = () => document.body.appendChild(document.createComment('screen')).remove()

export function Navigator({ routes, initialPath = '/', enterFrom = {}, rootPaths = [] }) {
  const [stack, setStack] = useState(() => stackFromUrl(routes, initialPath, enterFrom, rootPaths))
  const [anim, setAnim] = useState(null) // { type: 'push' | 'pop', key, leaving? }
  const stackRef = useRef(stack)
  stackRef.current = stack
  const animRef = useRef(anim)
  animRef.current = anim

  // ისტორია ჩატვირთულ სტეკს შეესაბამება, რომ „უკან" მუშაობდეს (ერთხელ, StrictMode-ის მეორე გაშვების გარეშე)
  const historyReady = useRef(false)
  useEffect(() => {
    if (historyReady.current) return
    historyReady.current = true
    stackRef.current.forEach((e, depth) =>
      window.history[depth ? 'pushState' : 'replaceState']({ depth, from: e.from }, '', urlFor(e.path, initialPath)),
    )
  }, [initialPath])

  const navigate = useCallback((path, { from = 'right', replace = false } = {}) => {
    if (animRef.current) return // ანიმაციის დროს მეორე გადასვლა (მაგ. ორმაგი სვაიპი) იგნორირდება
    const depth = replace ? 0 : stackRef.current.length
    window.history[replace ? 'replaceState' : 'pushState']({ depth, from }, '', urlFor(path, initialPath))
    const next = entry(path, from)
    setStack((s) => [...s, next])
    setAnim({ type: 'push', key: next.key, from, replace })
  }, [initialPath])

  // მხოლოდ მიმდინარე ეკრანის URL იცვლება, სტეკი/ეკრანი იგივე რჩება (მაგ. ტურის დასრულების შემდეგ: home-tour → home)
  const replaceUrl = useCallback(
    (path) => {
      window.history.replaceState(window.history.state, '', urlFor(path, initialPath))
      pingUseberry()
    },
    [initialPath],
  )

  const back = useCallback(() => {
    if (stackRef.current.length > 1 && !animRef.current) window.history.back()
  }, [])

  const reset = useCallback(() => {
    window.history.replaceState({ depth: 0 }, '', urlFor(initialPath, initialPath))
    setAnim(null)
    setStack([entry(initialPath)])
  }, [initialPath])

  useEffect(() => {
    const onPop = (e) => {
      const s = stackRef.current
      const depth = e.state?.depth ?? 0
      const top = s.length - 1
      if (depth < top) {
        const leaving = s[top]
        setStack(s.slice(0, Math.max(depth, 0) + 1))
        setAnim({ type: 'pop', key: s[Math.max(depth, 0)].key, leaving, from: leaving.from })
      } else if (depth > top) {
        const next = entry(pathFromUrl(initialPath), e.state?.from)
        setStack([...s, next])
        setAnim({ type: 'push', key: next.key, from: next.from })
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [initialPath])

  const [rootEl, setRootEl] = useState(null)
  useHiddenReset(rootEl, reset)

  const endAnim = () => {
    // replace: ანიმაციის შემდეგ სტეკში მხოლოდ ახალი ეკრანი რჩება
    if (animRef.current?.replace) setStack((s) => s.slice(-1))
    setAnim(null)
  }

  // fallback: თუ animationend არ მოვიდა (მაგ. ტაბი ფონშია), ანიმაცია მაინც დასრულდეს
  useEffect(() => {
    if (!anim) return
    const t = setTimeout(endAnim, 700)
    return () => clearTimeout(t)
  }, [anim])

  const topIndex = stack.length - 1
  const topKey = stack[topIndex].key

  /*
   * სქროლი: აქტიური ეკრანი window-ით სქროლავს, დანარჩენები — შიდა [data-scroll] ბლოკით.
   * ეკრანის შეცვლისას თითოეულის სქროლი ინახება და აღდგება, რომ push/pop ანიმაციაში არაფერი ხტოდეს.
   */
  const scrollMap = useRef({})
  const topKeyRef = useRef(topKey)
  useEffect(() => {
    window.history.scrollRestoration = 'manual' // სქროლს Navigator აღადგენს, არა ბრაუზერი
    const onScroll = () => (scrollMap.current[topKeyRef.current] = window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useLayoutEffect(() => {
    if (topKeyRef.current === topKey && rootEl?.dataset.ready) return
    topKeyRef.current = topKey
    if (!rootEl) return
    rootEl.dataset.ready = '1'
    const y = scrollMap.current[topKey] || 0
    rootEl.querySelectorAll(':scope > [data-key]').forEach((layer) => {
      if (Number(layer.dataset.key) === topKey) return
      layer.style.setProperty('--layer-top', y + 'px')
      const inner = layer.querySelector('[data-scroll]')
      if (inner) inner.scrollTop = scrollMap.current[layer.dataset.key] || 0
    })
    window.scrollTo(0, y)
  }, [topKey, rootEl])

  const layers = stack.map((e, i) => ({ ...e, index: i }))
  if (anim?.type === 'pop' && anim.leaving) layers.push({ ...anim.leaving, index: stack.length, leaving: true })

  return (
    <NavContext.Provider value={{ navigate, replaceUrl, back, reset, canGoBack: stack.length > 1 }}>
      <div className={styles.root} ref={setRootEl}>
        {layers.map((l) => {
          const Screen = routes[l.path] || routes['/']
          let cls = styles.layer + (anim?.from === 'left' ? ' ' + styles.fromLeft : '')
          // აქტიური ეკრანი დოკუმენტის ნაკადშია (nav-flow — Screen-ის sticky ნავბარ/ტაბ ბარისთვის)
          if (l.index === topIndex && !l.leaving) cls += ' ' + styles.flow + ' nav-flow'
          if (l.leaving) cls += ' ' + styles.popOut
          else if (l.index === topIndex) {
            if (anim?.type === 'push' && anim.key === l.key) cls += ' ' + styles.pushIn
            if (anim?.type === 'pop' && anim.key === l.key) cls += ' ' + styles.popIn
          } else if (l.index === topIndex - 1 && anim?.type === 'push') {
            cls += ' ' + styles.pushUnder
          } else {
            cls += ' ' + styles.hidden
          }
          return (
            <div
              key={l.key}
              data-key={l.key}
              className={cls}
              onAnimationEnd={(e) => e.target === e.currentTarget && endAnim()}
              aria-hidden={l.index !== topIndex || l.leaving}
            >
              <Screen />
            </div>
          )
        })}
      </div>
    </NavContext.Provider>
  )
}
