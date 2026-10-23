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
  '/transactions': TransactionsScreen,
  '/hub': HubScreen,
  '/gift-cards': GiftCardsScreen,
  '/currency-rates': CurrencyRatesScreen,
}

// პრელოგინი მხოლოდ ტურიან ვერსიაში (?onboarding=on), რომ ტური შესვლამდე არ დაიწყოს
const initialPath = onboardingParams.enabled ? '/login' : '/'

// ლინკით პირდაპირ გახსნისას: რომელი მხრიდან შემოდის ეკრანი (უკან სვაიპი/ანიმაცია ამით განისაზღვრება)
const enterFrom = { '/hub': 'left' }

export default function App() {
  return <Navigator routes={routes} initialPath={initialPath} enterFrom={enterFrom} />
}
