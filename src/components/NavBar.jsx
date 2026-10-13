import styles from './NavBar.module.css'
import menuSearch from '../assets/icons/menu-search.svg'
import qr from '../assets/icons/qr.svg'
import search from '../assets/icons/search-24.svg'
import chat from '../assets/icons/chat.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import profile from '../assets/images/profile.jpg'
import glassSphere from '../assets/images/glass-sphere.png'

export function IconButton({ icon, label, onClick, ...rest }) {
  return (
    <button type="button" className={`${styles.iconButton} pressable`} aria-label={label} onClick={onClick} {...rest}>
      <img src={icon} width="24" height="24" alt="" />
    </button>
  )
}

/* ზოგადი Navigation Bar: leading ღილაკი, სათაური, trailing ღილაკები */
export default function NavBar({ leading, title, trailing, inert = false }) {
  return (
    <header className={`${styles.bar} ${inert ? styles.inert : ''}`}>
      <div className={styles.content}>
        {leading}
        <div className={styles.center}>
          <p className={`${styles.title} t-subtitle-large ellipsis`}>{title}</p>
        </div>
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>
    </header>
  )
}

/*
 * მთავარი გვერდის ზედა Navigation Bar (Figma 3063:80403).
 * legacy — ცვლილებამდელი განლაგება ონბორდინგისთვის (Figma 3178:100154): QR მარცხნივ, ძიება მარჯვნივ.
 * inert — ონბორდინგის დროს ღილაკები არ რეაგირებს.
 * data-onb ატრიბუტებით ონბორდინგი ღილაკების რეალურ პოზიციებს პოულობს.
 */
export function HomeNavBar({ title = 'მთავარი', onMenu, legacy = false, inert = false }) {
  return (
    <NavBar
      inert={inert}
      leading={
        legacy ? (
          <IconButton icon={qr} label="QR" data-onb="nav-left" />
        ) : (
          <IconButton icon={menuSearch} label="მენიუ და ძიება" onClick={onMenu} data-onb="nav-left" />
        )
      }
      title={title}
      trailing={
        <>
          {legacy ? (
            <IconButton icon={search} label="ძიება" data-onb="nav-search" />
          ) : (
            <IconButton icon={qr} label="QR" data-onb="nav-search" />
          )}
          <IconButton icon={chat} label="ჩატი" />
          <button type="button" className={`${styles.avatar} pressable`} aria-label="პროფილი">
            <img className={styles.avatarPhoto} src={profile} alt="" />
            <img className={styles.avatarGlass} src={glassSphere} alt="" />
          </button>
        </>
      }
    />
  )
}

/* შიდა გვერდის Navigation Bar: უკან + სათაური + ჩატი (Figma 3091:150936).
   extraActions — ჩატამდე დამატებითი ღილაკები (მაგ. ტრანზაქციების ისტორია) */
export function BackNavBar({ title, onBack, extraActions = null }) {
  return (
    <NavBar
      leading={<IconButton icon={chevronLeft} label="უკან" onClick={onBack} />}
      title={title}
      trailing={
        <>
          {extraActions}
          <IconButton icon={chat} label="ჩატი" />
        </>
      }
    />
  )
}
