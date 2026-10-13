import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App'

// iOS Safari-ზე :active მხოლოდ touch listener-ის არსებობისას მუშაობს
document.addEventListener('touchstart', () => {}, { passive: true })
// pinch-zoom-ის გათიშვა iOS-ზე (user-scalable=no-ს iOS უგულებელყოფს)
document.addEventListener('gesturestart', (e) => e.preventDefault())
document.addEventListener('contextmenu', (e) => e.preventDefault())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
