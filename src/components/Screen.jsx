import { useState } from 'react'
import styles from './Screen.module.css'
import { useSwipe } from '../router/useSwipe'

/* ეკრანის ჩარჩო: ფიქსირებული ზედა ნავბარი, შუაში სქროლი, ფიქსირებული ქვედა ტულბარი.
   onSwipeRight / onSwipeLeft — ჰორიზონტალური სვაიპი მთელ ეკრანზე (მაგ. Hub-ის გახსნა/დახურვა)
   overlay — ეკრანის თავზე დახატული ფენა (მაგ. ონბორდინგი)
   underlay — კონტენტის ქვეშ დახატული ფენა (მაგ. Hub, რომელიც სვაიპის მინიშნებისას კიდიდან ჩანს) */
export default function Screen({ header, footer, children, contentClassName = '', onSwipeRight, onSwipeLeft, overlay, underlay }) {
  const [el, setEl] = useState(null)
  useSwipe(el, { onSwipeRight, onSwipeLeft })
  return (
    <div className={styles.screen} ref={setEl}>
      {underlay && <div className={styles.underlay}>{underlay}</div>}
      {header}
      <main className={`${styles.scroll} ${contentClassName}`}>{children}</main>
      {footer}
      {overlay}
    </div>
  )
}
