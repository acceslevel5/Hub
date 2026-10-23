import { Navigator } from './router/Navigator'
import PreloginScreen from './screens/PreloginScreen'
import HomeScreen from './screens/HomeScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import HubScreen from './screens/HubScreen'
import GiftCardsScreen from './screens/GiftCardsScreen'
import CurrencyRatesScreen from './screens/CurrencyRatesScreen'
import { onboardingParams } from './config/onboarding'

// ახალი ეკრანის დასამატებლად: შექმენი screens/XScreen.jsx და დაამატე აქ
const routes = {
  '/login': PreloginScreen,
  '/': HomeScreen,
  '/home-tour': HomeTourScreen,
  '/transactions': TransactionsScreen,
  '/hub': HubScreen,
  '/gift-cards': GiftCardsScreen,
  '/currency-rates': CurrencyRatesScreen,
}

// ეკრანების სათაურები (document.title): Useberry-ში ეკრანები ამ სახელებით ჩანს
const titles = {
  '/login': 'BOG – პრელოგინი',
  '/': 'BOG – მთავარი',
  '/home-tour': 'BOG – მთავარი (ტური)',
  '/transactions': 'BOG – ამონაწერი',
  '/hub': 'BOG – ჰაბი',
  '/gift-cards': 'BOG – სასაჩუქრე ბარათები',
  '/currency-rates': 'BOG – ვალუტის კურსები',
}

// პრელოგინი მხოლოდ ტურიან ვერსიაში (?onboarding=on), რომ ტური შესვლამდე არ დაიწყოს
const initialPath = onboardingParams.enabled ? '/login' : '/'

// მთავარი გვერდი ტურით (?screen=home-tour). ტურის შემდეგ URL ?screen=home ხდება, რომ Useberry-მ
// ტურის დროს და ტურის შემდეგ გაკეთებული ქლიქები ცალ-ცალკე ეკრანებად დაყოს
function HomeTourScreen({ deepLinked }) {
  return <HomeScreen tour tourInstant={deepLinked} />
}

// ლინკით პირდაპირ გახსნისას: რომელი მხრიდან შემოდის ეკრანი (უკან სვაიპი/ანიმაცია ამით განისაზღვრება)
const enterFrom = { '/hub': 'left' }

export default function App() {
  return <Navigator routes={routes} initialPath={initialPath} enterFrom={enterFrom} rootPaths={['/home-tour']} titles={titles} />
}
