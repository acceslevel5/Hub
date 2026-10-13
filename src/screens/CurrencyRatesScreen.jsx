import { useMemo, useState } from 'react'
import styles from './CurrencyRatesScreen.module.css'
import Screen from '../components/Screen'
import { BackNavBar } from '../components/NavBar'
import Toolbar from '../components/Toolbar'
import { useNav } from '../router/Navigator'
import { search } from '../utils/search'
import searchIcon from '../assets/icons/search-16.svg'
import chevronDown from '../assets/fx/chevron-down-16.svg'
import swapIcon from '../assets/fx/swap.svg'
import conversionIcon from '../assets/fx/conversion.svg'
import infoIcon from '../assets/fx/info.svg'
import favBgOn from '../assets/fx/favorite-bg-on.svg'
import favBgOff from '../assets/fx/favorite-bg-off.svg'
import starOn from '../assets/fx/star-on.svg'
import starOff from '../assets/fx/star-off.svg'
import arrowUp from '../assets/fx/arrow-up.svg'
import arrowUpNegative from '../assets/fx/arrow-up-negative.svg'
import arrowDownPositive from '../assets/fx/arrow-down-positive.svg'
import { calculator, currencyRates, ratesPromo } from '../data/currencyRates'

const TREND_ICONS = { up: arrowUp, 'up-negative': arrowUpNegative, 'down-positive': arrowDownPositive }

function Segmented({ value, onChange }) {
  const options = [
    ['calculator', 'კალკულატორი'],
    ['rates', 'კურსები'],
  ]
  return (
    <div className={styles.segmented} role="tablist">
      {options.map(([key, label]) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={value === key}
          className={`${styles.segment} ${value === key ? styles.segmentActive : ''} t-label-medium ellipsis`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ---------- კალკულატორი (Figma 3196:207443) ---------- */
const format = (n) => (Number.isFinite(n) && n > 0 ? n.toFixed(2) : '')
const parse = (s) => parseFloat(String(s).replace(',', '.'))

function CurrencySelector({ code }) {
  const c = calculator.currencies[code]
  return (
    <span className={styles.selector}>
      <span className={styles.option}>
        <img src={c.flag} width="16" height="16" alt="" />
        <span className={styles.optionCode}>{c.code}</span>
      </span>
      <img src={chevronDown} width="16" height="16" alt="" />
    </span>
  )
}

function Calculator() {
  // from — რომელ ვალუტას ყიდის იუზერი (გაყიდვა), to — რომელს იღებს (ყიდვა)
  const [from, setFrom] = useState('GEL')
  const [amounts, setAmounts] = useState({ sell: '', buy: '' })
  const to = from === 'GEL' ? 'USD' : 'GEL'
  const convert = (value, direction) => {
    const n = parse(value)
    // GEL → USD: იყოფა კურსზე; USD → GEL: მრავლდება
    const toUsd = (from === 'GEL') === (direction === 'sell')
    return format(toUsd ? n / calculator.rate : n * calculator.rate)
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.calcTop}>
        <label className={styles.input}>
          <input
            className={styles.inputField}
            inputMode="decimal"
            placeholder="გაყიდვა"
            value={amounts.sell}
            onChange={(e) => setAmounts({ sell: e.target.value, buy: convert(e.target.value, 'sell') })}
          />
          <CurrencySelector code={from} />
        </label>
        <button
          type="button"
          className={`${styles.swap} pressable`}
          aria-label="ვალუტების გაცვლა"
          onClick={() => {
            setFrom(to)
            setAmounts(({ sell, buy }) => ({ sell: buy, buy: sell }))
          }}
        >
          <img src={swapIcon} width="16" height="16" alt="" />
        </button>
        <label className={styles.input}>
          <input
            className={styles.inputField}
            inputMode="decimal"
            placeholder="ყიდვა"
            value={amounts.buy}
            onChange={(e) => setAmounts({ buy: e.target.value, sell: convert(e.target.value, 'buy') })}
          />
          <CurrencySelector code={to} />
        </label>
        <div className={styles.rate}>
          <span className="t-body-small">{calculator.rateLabel}</span>
          <span className={styles.rateValue}>
            <s className={styles.rateOld}>{calculator.oldRate}</s> {calculator.rate.toFixed(2)}
          </span>
        </div>
      </div>
      <button type="button" className={`${styles.primaryButton} t-label-large pressable`}>
        კონვერტაცია
      </button>
    </div>
  )
}

/* ---------- კურსები (Figma 3196:207461) ---------- */
function RateCard({ c }) {
  const old = c.style === 'old'
  return (
    <div className={`${styles.card} ${old ? styles.cardOld : ''}`}>
      <div className={styles.cardHead}>
        <img className={styles.flag} src={c.flag} width="40" height="40" alt="" />
        <div className={styles.cardTitles}>
          <div className={styles.cardTitleRow}>
            <span className={`t-list-body ${styles.cardAmount}`}>{c.amount}</span>
            {c.badge && <span className={`${styles.badge} t-label-small`}>{c.badge}</span>}
          </div>
          <span className={`t-body-small ${styles.secondary}`}>{c.name}</span>
        </div>
        <button type="button" className={`${styles.favorite} pressable`} aria-label="რჩეული">
          <img src={c.favorite ? favBgOn : favBgOff} width="32" height="32" alt="" />
          <img className={styles.star} src={c.favorite ? starOn : starOff} width="16" height="16" alt="" />
        </button>
      </div>

      <div className={styles.rates}>
        <div className={`${styles.rateRow} ${styles.rateHeader}`}>
          <span />
          <span className={styles.values}>
            <span>ყიდვა</span>
            <span>გაყიდვა</span>
          </span>
        </div>
        {c.rows.map(([label, buy, sell], i) => (
          <div key={label} className={`${styles.rateRow} ${i === 0 ? styles.rateBest : styles.rateStandard}`}>
            <span className={styles.rateLabel}>{label}</span>
            <span className={styles.values}>
              <span>{buy}</span>
              <span>{sell}</span>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.line} />
      <div className={styles.official}>
        <span className={styles.officialLabel}>ოფიციალური კურსი</span>
        <span className={styles.officialValue}>
          {c.official}
          <img src={TREND_ICONS[c.trend]} width="12" height="12" alt="" />
        </span>
      </div>
    </div>
  )
}

function Rates() {
  const [query, setQuery] = useState('')
  const items = useMemo(() => {
    if (!query.trim()) return currencyRates
    const indexed = currencyRates.map((c) => ({ ...c, title: `${c.code} ${c.name}` }))
    return search(indexed, query)
  }, [query])

  return (
    <div className={styles.ratesTab}>
      <label className={styles.search}>
        <img src={searchIcon} width="16" height="16" alt="" />
        <input
          className={`t-body-medium ${styles.searchField}`}
          type="search"
          placeholder="მოძებნე ვალუტა"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </label>
      <div className={styles.promo}>
        <span className={styles.promoIcon}>
          <img src={conversionIcon} width="16" height="16" alt="" />
        </span>
        <p className={`t-body-small ${styles.promoText}`}>{ratesPromo}</p>
        <button type="button" className={`${styles.promoInfo} pressable`} aria-label="ინფორმაცია">
          <img src={infoIcon} width="16" height="16" alt="" />
        </button>
      </div>
      <div className={styles.cards}>
        {items.map((c) => (
          <RateCard key={c.code} c={c} />
        ))}
      </div>
    </div>
  )
}

/* ვალუტის კურსები — Figma 3196:207443 / 3196:207461 */
export default function CurrencyRatesScreen() {
  const { back } = useNav()
  const [tab, setTab] = useState('calculator')
  return (
    <Screen header={<BackNavBar title="ვალუტის კურსები" onBack={back} />} footer={<Toolbar active="home" />}>
      <div className={styles.page}>
        <Segmented value={tab} onChange={setTab} />
        {tab === 'calculator' ? <Calculator /> : <Rates />}
      </div>
    </Screen>
  )
}
