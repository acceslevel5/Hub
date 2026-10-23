import { useCallback, useState } from 'react'
import styles from './HomeScreen.module.css'
import Screen from '../components/Screen'
import { HomeNavBar } from '../components/NavBar'
import Toolbar from '../components/Toolbar'
import Button from '../components/Button'
import Stories from './home/Stories'
import AccountSection from './home/AccountSection'
import { UpcomingPayments, Loyalty, ProductsForYou, RecentTransactions } from './home/HomeSections'
import HubOnboarding from './home/HubOnboarding'
import HubScreen from './HubScreen'
import { useNav } from '../router/Navigator'
import { onboardingParams } from '../config/onboarding'

/*
 * ონბორდინგის მდგომარეობა (ჩართულია მხოლოდ /home-tour ეკრანზე, რომელზეც ?onboarding=on-ის პრელოგინი გადადის).
 * reset-ზე მთავარი გვერდი ხელახლა იხატება, ამიტომ ონბორდინგიც თავიდან ითამაშებს.
 */
function useOnboardingState(enabled) {
  const [active, setActive] = useState(enabled) // ფენა ეკრანზეა
  const [blocking, setBlocking] = useState(enabled) // ნავბარი/ტაბ ბარი არ რეაგირებს
  const [navLegacy, setNavLegacy] = useState(enabled)
  const [toolbarLegacy, setToolbarLegacy] = useState(enabled)
  const [hubPeek, setHubPeek] = useState(false)
  return { active, setActive, blocking, setBlocking, navLegacy, setNavLegacy, toolbarLegacy, setToolbarLegacy, hubPeek, setHubPeek }
}

/* მთავარი გვერდი — Figma 3063:80339 */
export default function HomeScreen({ tour = false }) {
  const { navigate, replaceUrl } = useNav()
  const onb = useOnboardingState(tour)
  const openStatement = () => navigate('/transactions')
  // Figma prototype: მენიუ/ძიების ღილაკი ან მარცხნიდან მარჯვნივ სვაიპი → Hub (მარცხნიდან)
  const openHub = useCallback(() => navigate('/hub', { from: 'left' }), [navigate])

  return (
    <Screen
      header={<HomeNavBar title="მთავარი" onMenu={openHub} legacy={onb.navLegacy} inert={onb.blocking} />}
      footer={<Toolbar active="home" legacy={onb.toolbarLegacy} inert={onb.blocking} />}
      onSwipeRight={onb.active ? undefined : openHub}
      underlay={onb.hubPeek ? <HubScreen /> : null}
      overlay={
        onb.active && (
          <HubOnboarding
            copyKey={onboardingParams.copyKey}
            onToolbarCollapse={() => onb.setToolbarLegacy(false)}
            onLand={() => onb.setNavLegacy(false)}
            onTipClosed={() => onb.setBlocking(false)}
            onSwipeHint={onb.setHubPeek}
            onCta={() => replaceUrl('/')} // ტური დასრულდა: შემდეგი ქლიქები Useberry-ში ჩვეულებრივ მთავარ გვერდზე
            onFinish={(thenOpenHub) => {
              onb.setActive(false)
              replaceUrl('/') // reduced motion / სხვა გზით დასრულებისას (თუ URL უკვე home-ა, არაფერი იცვლება)
              if (thenOpenHub) openHub()
            }}
          />
        )
      }
    >
      <div className={styles.page}>
        <div className={styles.top}>
          <Stories />
          <AccountSection />
        </div>
        <div className={styles.sections}>
          <UpcomingPayments />
          <Loyalty />
          <ProductsForYou />
          <RecentTransactions onOpenAll={openStatement} />
          <Button>მოირგე მთავარი გვერდი</Button>
        </div>
      </div>
    </Screen>
  )
}
