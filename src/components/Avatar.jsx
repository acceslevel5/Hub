import styles from './Avatar.module.css'
import arrowUp from '../assets/icons/badge-arrow-up.svg'
import arrowDown from '../assets/icons/badge-arrow-down.svg'

/* 40px ავატარი: 24px აიქონი outline-ში / ფოტო / ინიციალები + სურვილისამებრ ↑↓ ბეჯი */
export default function Avatar({ icon, image, crop, framed, initials, badge }) {
  let body
  if (icon) {
    body = (
      <div className={styles.iconCircle}>
        <img src={icon} width="24" height="24" alt="" />
      </div>
    )
  } else if (image) {
    body = (
      <div className={`${styles.photo} ${framed ? styles.framed : styles.hairline}`}>
        <img src={image} alt="" style={crop ? { position: 'absolute', maxWidth: 'none', ...crop } : undefined} />
      </div>
    )
  } else {
    body = <div className={`${styles.initials} t-avatar-initials`}>{initials}</div>
  }

  return (
    <div className={styles.avatar}>
      {body}
      {badge && (
        <span className={styles.badge}>
          <img src={badge === 'up' ? arrowUp : arrowDown} width="13.333" height="13.333" alt="" />
        </span>
      )}
    </div>
  )
}
