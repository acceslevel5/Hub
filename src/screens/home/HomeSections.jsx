import styles from './HomeSections.module.css'
import closeIcon from '../../assets/icons/close-10.svg'
import { SectionCard, SectionTitle } from '../../components/Section'
import { ListRow, ThumbIcon, ThumbImage, TwoLine, Amount } from '../../components/ListItem'
import Button from '../../components/Button'
import Carousel from '../../components/Carousel'
import { loyalty, productOffers, upcomingPayments } from '../../data/home'
import { recentTransactions } from '../../data/transactions'

export function UpcomingPayments() {
  return (
    <SectionCard>
      <SectionTitle>მოახლოებული გადახდები</SectionTitle>
      {upcomingPayments.map((p) => (
        <ListRow
          key={p.id}
          leading={<ThumbIcon icon={p.icon} />}
          trailing={<p className={`t-label-large ${styles.nowrap}`}>{p.amount}</p>}
        >
          <TwoLine title={p.title} subtitle={p.subtitle} />
        </ListRow>
      ))}
    </SectionCard>
  )
}

export function Loyalty() {
  return (
    <SectionCard>
      <SectionTitle chevron>ლოიალურობა</SectionTitle>
      <div>
        {loyalty.map((l, i) => (
          <ListRow
            key={l.id}
            className={styles.loyaltyRow}
            leading={<ThumbImage src={l.image} />}
            trailing={<Amount value={l.value} caption={l.caption} size="small" />}
          >
            <p className={`t-list-body ${styles.loyaltyTitle}`}>{l.title}</p>
            {i < loyalty.length - 1 && <div className={styles.loyaltyDivider} />}
          </ListRow>
        ))}
      </div>
    </SectionCard>
  )
}

export function ProductsForYou() {
  return (
    <section className={styles.products}>
      <h2 className={`t-subtitle-large ${styles.productsTitle}`}>პროდუქტები შენთვის</h2>
      <Carousel className={styles.carousel}>
        {productOffers.map((o) => (
          <div key={o.id} className={`${styles.offer} pressable`}>
            <div className={styles.offerTop}>
              <img src={o.illustration} width="74.667" height="56" alt="" />
              <span className={styles.offerClose}>
                <img src={closeIcon} width="10" height="10" alt="" />
              </span>
            </div>
            <div className={styles.offerText}>
              <p className={`t-caption-regular ${styles.offerDescription}`}>{o.text}</p>
              <p className={`t-cta ${styles.offerCta}`}>{o.cta}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export function RecentTransactions({ onOpenAll }) {
  return (
    <SectionCard padded={false}>
      <SectionTitle chevron onClick={onOpenAll} className={styles.transactionsTitle}>
        ბოლო ტრანზაქციები
      </SectionTitle>
      <div className={styles.transactionsBody}>
        {recentTransactions.map((group, gi) => (
          <div key={gi}>
            <p className={`t-body-small ${styles.date}`}>{group.date}</p>
            {group.items.map((t) => (
              <ListRow
                key={t.id}
                className={styles.transactionRow}
                leading={t.icon ? <ThumbIcon icon={t.icon} /> : <ThumbImage src={t.image} fit={t.fit} />}
                trailing={<Amount value={t.amount} caption={t.caption} tone={t.tone} />}
              >
                <TwoLine title={t.title} subtitle={t.subtitle} />
              </ListRow>
            ))}
          </div>
        ))}
        <Button fullWidth onClick={onOpenAll}>
          ყველას ნახვა
        </Button>
      </div>
    </SectionCard>
  )
}
