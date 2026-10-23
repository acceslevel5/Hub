import { useState } from 'react'
import styles from './Screen.module.css'
import { useSwipe } from '../router/useSwipe'

/* ეკრანის ჩარჩო: ფიქსირებული ზედა ნავბარი, შუაში სქროლი, ფიქსირებული ქვედა ტულბარი.
   აქტიურ ეკრანზე სქროლავს window (ნავბარი/ტაბ ბარი sticky), არააქტიურზე — შიდა main.
   onSwipeRight / onSwipeLeft — ჰორიზონტალური სვაიპი მთელ ეკრანზე (მაგ. Hub-ის გახსნა/დახურვა)
   overlay — ეკრანის თავზე დახატული ფენა (მაგ. ონბორდინგი)
   underlay — კონტენტის ქვეშ დახატული ფენა (მაგ. Hub, რომელიც სვაიპის მინიშნებისას კიდიდან ჩანს) */
export default function Screen({ header, footer, children, contentClassName = '', onSwipeRight, onSwipeLeft, overlay, underlay }) {
  const [el, setEl] = useState(null)
  useSwipe(el, { onSwipeRight, onSwipeLeft })
  return (
    // overlay/underlay-ის დროს (ონბორდინგი) ეკრანი ერთ viewport-ზეა ჩაკეტილი, შიდა სქროლით
    <div className={`${styles.screen} ${overlay || underlay ? styles.locked : ''}`} ref={setEl}>
      {underlay && <div className={styles.underlay}>{underlay}</div>}
      {header}
      <main className={`${styles.scroll} ${contentClassName}`} data-scroll>{children}</main>
      {footer}
      {overlay}
    </div>
  )
}
