import styles from './Toolbar.module.css'
import homeIcon from '../assets/icons/tab-home.svg'
import productsIcon from '../assets/icons/tab-products.svg'
import transferIcon from '../assets/icons/tab-transfer.svg'
import offerIcon from '../assets/icons/tab-offer.svg'
import hubIcon from '../assets/icons/tab-hub.svg'
import line from '../assets/icons/toolbar-line.svg'

const TABS = [
  { key: 'home', label: 'მთავარი', icon: homeIcon },
  { key: 'products', label: 'ჩემი სივრცე', icon: productsIcon },
  { key: 'transfer', label: 'გადარიცხვა', icon: transferIcon, center: true },
  { key: 'offers', label: 'შეთავაზებები', icon: offerIcon, labelColor: '#757575' },
  { key: 'hub', label: 'ჰაბი', icon: hubIcon, legacyOnly: true },
]

/*
 * ქვედა Toolbar (Figma 3063:80423). Home Indicator-ის ადგილს safe-area იკავებს.
 * legacy — ძველი 5-ტაბიანი ვერსია („ჰაბი" ტაბით, გადარიცხვა მრგვალ ფონზე; Figma 3162:92273).
 *          false-ზე გადასვლისას „ჰაბი" ტაბი ანიმაციით იკეცება (Hub-ის ონბორდინგი).
 * inert — ონბორდინგის დროს ტაბები არ რეაგირებს.
 */
export default function Toolbar({ active = 'home', legacy = false, inert = false }) {
  return (
    <nav className={`${styles.toolbar} ${legacy ? styles.legacy : ''} ${inert ? styles.inert : ''}`}>
      <img className={styles.line} src={line} alt="" />
      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${t.center ? styles.centerTab : ''} ${t.legacyOnly ? styles.legacyTab : ''} pressable`}
            tabIndex={t.legacyOnly && !legacy ? -1 : undefined}
            aria-hidden={t.legacyOnly && !legacy ? true : undefined}
          >
            {t.center && <span className={styles.centerBg} />}
            <img
              className={styles.icon}
              src={t.icon}
              width="24"
              height="24"
              alt=""
              data-onb={t.legacyOnly ? 'hub-tab-icon' : undefined}
            />
            <span
              className={`${styles.label} t-tab-bar`}
              style={{ color: t.key === active ? 'var(--text-accent)' : t.labelColor || 'var(--text-helper)' }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
