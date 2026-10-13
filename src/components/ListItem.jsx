import styles from './ListItem.module.css'
import thumbBorder from '../assets/icons/thumb-border.svg'

/* 40×40 სლოტი: მრგვალი სურათი 36px + თხელი ჩარჩო */
export function ThumbImage({ src, fit = 'cover' }) {
  return (
    <div className={styles.thumb}>
      <div className={styles.thumbClip}>
        <img src={src} alt="" style={{ objectFit: fit }} />
      </div>
      <img className={styles.thumbBorder} src={thumbBorder} width="36" height="36" alt="" />
    </div>
  )
}

/* 40×40 სლოტი: 16px აიქონი მრგვალ outline-ში */
export function ThumbIcon({ icon }) {
  return (
    <div className={styles.thumbIconSlot}>
      <div className={styles.thumbIconCircle}>
        <img src={icon} width="16" height="16" alt="" />
      </div>
    </div>
  )
}

/* ორხაზიანი ტექსტი: ზემოთ სათაური (15/20), ქვემოთ subtitle (12/18) */
export function TwoLine({ title, subtitle }) {
  return (
    <div className={styles.twoLine}>
      <p className={`t-list-body ellipsis ${styles.primary}`}>{title}</p>
      <p className={`t-body-small ellipsis ${styles.secondary}`}>{subtitle}</p>
    </div>
  )
}

/* მარჯვენა მხარე: თანხა + caption */
export function Amount({ value, caption, tone = 'primary', size = 'large' }) {
  return (
    <div className={styles.amount}>
      <p
        className={size === 'large' ? 't-label-large' : 't-list-value'}
        style={{ color: tone === 'success' ? 'var(--text-success)' : 'var(--text-primary)' }}
      >
        {value}
      </p>
      {caption && <p className={`t-body-small ${styles.secondary}`}>{caption}</p>}
    </div>
  )
}

export function ListRow({ leading, children, trailing, className = '', onClick }) {
  return (
    <div className={`${styles.row} ${onClick ? 'pressable' : ''} ${className}`} onClick={onClick}>
      {leading}
      <div className={styles.content}>{children}</div>
      {trailing}
    </div>
  )
}
