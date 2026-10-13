import styles from './Section.module.css'
import chevronRight from '../assets/icons/chevron-right.svg'

/* თეთრი სექციის კონტეინერი (radius 24) */
export function SectionCard({ children, className = '', padded = true }) {
  return <section className={`${styles.card} ${padded ? styles.padded : ''} ${className}`}>{children}</section>
}

/* სექციის სათაური, სურვილისამებრ chevron-ით და დაჭერით */
export function SectionTitle({ children, chevron = false, onClick, className = '' }) {
  const content = (
    <>
      <span className="t-section-title">{children}</span>
      {chevron && <img src={chevronRight} width="12" height="12" alt="" />}
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={`${styles.title} pressable ${className}`} onClick={onClick}>
        {content}
      </button>
    )
  }
  return <div className={`${styles.title} ${className}`}>{content}</div>
}
