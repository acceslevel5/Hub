import styles from './AccountSection.module.css'
import eyeHidden from '../../assets/icons/eye-hidden.svg'
import mastercard from '../../assets/icons/mastercard.svg'
import cardMask from '../../assets/icons/card-mask.svg'
import { account, availableBalance, quickActions } from '../../data/home'

function BalanceSummary() {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryTitles}>
        <p className="t-label-xsmall">{availableBalance.label}</p>
        <p className="t-h5-bold">{availableBalance.value}</p>
      </div>
      <button type="button" className={`${styles.eyeButton} pressable`} aria-label="თანხის დამალვა">
        <img src={eyeHidden} width="16" height="16" alt="" />
      </button>
    </div>
  )
}

function AccountCard() {
  return (
    <div className={styles.cards}>
      <div className={styles.sideSpacer} />
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardStack}>
            <img
              className={styles.cardImage}
              src={account.cardImage}
              alt=""
              style={{ maskImage: `url("${cardMask}")`, WebkitMaskImage: `url("${cardMask}")` }}
            />
          </div>
          <img src={mastercard} width="26" height="16" alt="" />
        </div>
        <div className={styles.cardContent}>
          <p className={`t-label-small ellipsis ${styles.accountName}`}>{account.name}</p>
          <div className={styles.bigAmount}>
            <p className="t-heading-large">{account.amount}</p>
            <p className={`t-heading-large ${styles.bigCurrency}`}>{account.currency}</p>
          </div>
        </div>
        <div className={styles.currencies}>
          {account.currencies.map((c, i) => (
            <div key={c.symbol} className={styles.currency}>
              <div
                className={`t-body-small ${styles.currencyAmount}`}
                style={{ color: c.disabled ? 'var(--text-disabled)' : 'var(--text-primary)' }}
              >
                <span>{c.amount}</span>
                <span className={c.symbol === '₾' ? styles.symbolGel : styles.symbol}>{c.symbol}</span>
              </div>
              {i < account.currencies.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peek}>
        <div className={styles.peekCard} />
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className={styles.actions}>
      {quickActions.map((a) => (
        <button key={a.id} type="button" className={`${styles.action} pressable`}>
          <span className={styles.actionIcon}>
            <img src={a.icon} width="24" height="24" alt="" />
          </span>
          <span className={`t-body-medium ${styles.actionLabel}`}>{a.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function AccountSection() {
  return (
    <div className={styles.section}>
      <BalanceSummary />
      <div className={styles.hero}>
        <AccountCard />
        <QuickActions />
      </div>
    </div>
  )
}
