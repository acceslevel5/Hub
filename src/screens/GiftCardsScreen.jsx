import styles from './GiftCardsScreen.module.css'
import Screen from '../components/Screen'
import { BackNavBar, IconButton } from '../components/NavBar'
import Toolbar from '../components/Toolbar'
import Carousel from '../components/Carousel'
import { useNav } from '../router/Navigator'
import searchIcon from '../assets/icons/search-16.svg'
import historyIcon from '../assets/icons/transaction-history.svg'
import listViewIcon from '../assets/icons/list-view.svg'
import gridViewIcon from '../assets/icons/grid-view.svg'
import { giftCategories, giftPromotions, giftStoreRows } from '../data/giftCards'

function CategoryCard({ category }) {
  return (
    <button type="button" className={`${styles.category} pressable`}>
      <img className={styles.categoryImage} src={category.image} width="36" height="36" alt="" />
      <span className={`t-label-large-22 ${styles.categoryTitle}`}>{category.title}</span>
    </button>
  )
}

function PromoCard({ promo }) {
  return (
    <div className={`${styles.promo} pressable`}>
      <img className={styles.promoImage} src={promo.image} alt="" />
      <div className={`${styles.promoFooter} ${promo.compact ? styles.promoFooterCompact : ''}`}>
        <div className={styles.promoInfo}>
          <p className="t-label-large ellipsis">{promo.title}</p>
          <p className={`t-body-medium ellipsis ${styles.secondary}`}>{promo.subtitle}</p>
        </div>
        <button type="button" className={`${styles.primaryButton} t-label-medium`}>
          დეტალურად
        </button>
      </div>
    </div>
  )
}

function StoreCard({ store }) {
  return (
    <button type="button" className={`${styles.store} pressable`}>
      <span className={styles.storeLogo}>
        <img src={store.logo} alt="" style={store.crop ? { position: 'absolute', maxWidth: 'none', ...store.crop } : undefined} />
      </span>
      <span className={styles.storeText}>
        <span className="t-label-large">{store.title}</span>
        <span className={`t-body-small ${styles.secondary}`}>{store.subtitle}</span>
      </span>
    </button>
  )
}

/* სასაჩუქრე ბარათები — Figma 3109:11388 */
export default function GiftCardsScreen() {
  const { back } = useNav()
  return (
    <Screen
      header={
        <BackNavBar
          title="სასაჩუქრე ბარათები"
          onBack={back}
          extraActions={<IconButton icon={historyIcon} label="ტრანზაქციების ისტორია" />}
        />
      }
      footer={<Toolbar active="home" />}
    >
      <div className={styles.page}>
        <div className={styles.top}>
          <div className={styles.searchWrap}>
            <button type="button" className={`${styles.search} pressable`}>
              <img src={searchIcon} width="16" height="16" alt="" />
              <span className={`t-body-medium ${styles.secondary}`}>ძიება</span>
            </button>
          </div>
          <Carousel className={styles.categories}>
            {giftCategories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </Carousel>
        </div>

        <section className={styles.promotions}>
          <h2 className={`t-subtitle-large ${styles.sectionTitle}`}>პოპულარულები</h2>
          <Carousel className={styles.promoRow}>
            {giftPromotions.map((p) => (
              <PromoCard key={p.id} promo={p} />
            ))}
          </Carousel>
        </section>

        <section className={styles.stores}>
          <div className={styles.storesHeader}>
            <h2 className="t-subtitle-large">ყველა მაღაზია</h2>
            <div className={styles.segmented}>
              <button type="button" className={styles.segment} aria-label="სიის ხედი">
                <img src={listViewIcon} width="16" height="16" alt="" />
              </button>
              <button type="button" className={`${styles.segment} ${styles.segmentActive}`} aria-label="ბადის ხედი">
                <img src={gridViewIcon} width="16" height="16" alt="" />
              </button>
            </div>
          </div>
          <div className={styles.storeGrid}>
            {giftStoreRows.map((row, i) => (
              <div key={i} className={styles.storeRow} style={{ gap: row.gap }}>
                {row.stores.map((s) => (
                  <StoreCard key={s.id} store={s} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Screen>
  )
}
