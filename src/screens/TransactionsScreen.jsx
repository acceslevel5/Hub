import styles from './TransactionsScreen.module.css'
import Screen from '../components/Screen'
import { BackNavBar } from '../components/NavBar'
import Toolbar from '../components/Toolbar'
import Avatar from '../components/Avatar'
import { ListRow, TwoLine, Amount } from '../components/ListItem'
import { useNav } from '../router/Navigator'
import searchIcon from '../assets/icons/search-16.svg'
import calendarIcon from '../assets/icons/calendar-16.svg'
import settingsIcon from '../assets/icons/settings-16.svg'
import downloadIcon from '../assets/icons/download-16.svg'
import arrowUp from '../assets/icons/arrow-up-10.svg'
import arrowDown from '../assets/icons/arrow-down-10.svg'
import { statementGroups, statementPeriod, statementSummary } from '../data/statement'

function SummaryBox({ tone, icon, label, amount }) {
  return (
    <div className={`${styles.summaryBox} ${tone === 'expense' ? styles.expense : styles.income}`}>
      <div className={styles.summaryLabel}>
        <img src={icon} width="10" height="10" alt="" />
        <span className="t-label-xsmall">{label}</span>
      </div>
      <p className="t-label-medium">{amount}</p>
    </div>
  )
}

function SmallIconButton({ icon, label }) {
  return (
    <button type="button" className={`${styles.smallIconButton} pressable`} aria-label={label}>
      <img src={icon} width="16" height="16" alt="" />
    </button>
  )
}

/* ამონაწერი — Figma 3091:150443 */
export default function TransactionsScreen() {
  const { back } = useNav()
  return (
    <Screen header={<BackNavBar title="ამონაწერი" onBack={back} />} footer={<Toolbar active="home" />}>
      <div className={styles.page}>
        <section className={styles.controls}>
          <button type="button" className={`${styles.search} pressable`}>
            <img src={searchIcon} width="16" height="16" alt="" />
            <span className="t-body-medium">ძებნა</span>
          </button>
          <div className={styles.filterRow}>
            <button type="button" className={`${styles.period} pressable`}>
              <img src={calendarIcon} width="16" height="16" alt="" />
              <span className={`t-body-medium ${styles.periodText}`}>{statementPeriod}</span>
            </button>
            <SmallIconButton icon={settingsIcon} label="ფილტრი" />
            <SmallIconButton icon={downloadIcon} label="ჩამოტვირთვა" />
          </div>
          <div className={styles.summary}>
            <SummaryBox tone="expense" icon={arrowUp} {...statementSummary.expense} />
            <SummaryBox tone="income" icon={arrowDown} {...statementSummary.income} />
          </div>
        </section>

        <section className={styles.list}>
          {statementGroups.map((group) => (
            <div key={group.date} className={styles.group}>
              <p className={`t-body-small ${styles.date}`}>{group.date}</p>
              <div>
                {group.items.map((t) => (
                  <ListRow
                    key={t.id}
                    className={styles.row}
                    leading={<Avatar {...t} />}
                    trailing={<Amount value={t.amount} caption={t.caption} tone={t.tone} />}
                  >
                    <TwoLine title={t.title} subtitle={t.subtitle} />
                  </ListRow>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Screen>
  )
}
