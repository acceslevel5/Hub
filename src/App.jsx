import { Navigator } from './router/Navigator'
import HomeScreen from './screens/HomeScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import HubScreen from './screens/HubScreen'
import GiftCardsScreen from './screens/GiftCardsScreen'
import CurrencyRatesScreen from './screens/CurrencyRatesScreen'

// ახალი ეკრანის დასამატებლად: შექმენი screens/XScreen.jsx და დაამატე აქ
const routes = {
  '/': HomeScreen,
  '/transactions': TransactionsScreen,
  '/hub': HubScreen,
  '/gift-cards': GiftCardsScreen,
  '/currency-rates': CurrencyRatesScreen,
}

export default function App() {
  return <Navigator routes={routes} initialPath="/" />
}
