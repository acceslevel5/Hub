import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './Navigator.module.css'
import { useHiddenReset } from './useHiddenReset'

/*
 * მარტივი stack-ნავიგატორი hash-ისთვის (GitHub Pages).
 * - navigate(path) → push ანიმაცია, back() → pop ანიმაცია (iOS-ის მსგავსად)
 * - ყველა ეკრანი სტეკში mounted რჩება, ამიტომ უკან დაბრუნებისას სქროლი და მდგომარეობა ინახება
 * - reset() → მთავარ გვერდზე დაბრუნება და ყველა მდგომარეობის გასუფთავება (remount)
 */

const NavContext = createContext(null)
export const useNav = () => useContext(NavContext)

let uid = 0
// from: 'right' (iOS push) ან 'left' (მაგ. Hub, რომელიც მარცხნიდან შემოდის)
const entry = (path, from = 'right') => ({ key: ++uid, path, from })
const hashPath = () => window.location.hash.replace(/^#/, '') || '/'

export function Navigator({ routes, initialPath = '/' }) {
  const [stack, setStack] = useState(() => [entry(initialPath)])
  const [anim, setAnim] = useState(null) // { type: 'push' | 'pop', key, leaving? }
  const stackRef = useRef(stack)
  stackRef.current = stack
  const animRef = useRef(anim)
  animRef.current = anim

  // პირველი ჩატვირთვა ყოველთვის მთავარი გვერდიდან
  useEffect(() => {
    window.history.replaceState({ depth: 0 }, '', '#' + initialPath)
  }, [initialPath])

  const navigate = useCallback((path, { from = 'right' } = {}) => {
    if (animRef.current) return // ანიმაციის დროს მეორე გადასვლა (მაგ. ორმაგი სვაიპი) იგნორირდება
    const depth = stackRef.current.length
    window.history.pushState({ depth, from }, '', '#' + path)
    const next = entry(path, from)
    setStack((s) => [...s, next])
    setAnim({ type: 'push', key: next.key, from })
  }, [])

  const back = useCallback(() => {
    if (stackRef.current.length > 1 && !animRef.current) window.history.back()
  }, [])

  const reset = useCallback(() => {
    window.history.replaceState({ depth: 0 }, '', '#' + initialPath)
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
        const next = entry(hashPath(), e.state?.from)
        setStack([...s, next])
        setAnim({ type: 'push', key: next.key, from: next.from })
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const [rootEl, setRootEl] = useState(null)
  useHiddenReset(rootEl, reset)

  const endAnim = () => setAnim(null)

  // fallback: თუ animationend არ მოვიდა (მაგ. ტაბი ფონშია), ანიმაცია მაინც დასრულდეს
  useEffect(() => {
    if (!anim) return
    const t = setTimeout(endAnim, 700)
    return () => clearTimeout(t)
  }, [anim])

  const topIndex = stack.length - 1
  const layers = stack.map((e, i) => ({ ...e, index: i }))
  if (anim?.type === 'pop' && anim.leaving) layers.push({ ...anim.leaving, index: stack.length, leaving: true })

  return (
    <NavContext.Provider value={{ navigate, back, reset, canGoBack: stack.length > 1 }}>
      <div className={styles.root} ref={setRootEl}>
        {layers.map((l) => {
          const Screen = routes[l.path] || routes['/']
          let cls = styles.layer + (anim?.from === 'left' ? ' ' + styles.fromLeft : '')
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
