import { useEffect, useRef, useState } from 'react'
import styles from './PreloginScreen.module.css'
import { useNav } from '../router/Navigator'
import background from '../assets/prelogin/background.png'
import avatar from '../assets/prelogin/avatar.jpg'
import chevronLeft from '../assets/icons/chevron-left-16.svg'
import chatIcon from '../assets/prelogin/chat-16.svg'
import moreIcon from '../assets/prelogin/more-16.svg'
import backspaceIcon from '../assets/prelogin/backspace.svg'
import faceScan from '../assets/prelogin/faceid-scan.svg'
import faceChecking from '../assets/prelogin/faceid-checking.png'
import faceCircle from '../assets/prelogin/faceid-circle.svg'
import faceCheck from '../assets/prelogin/faceid-check.svg'

/*
 * პრელოგინი (Figma prototype 3218:20630 → 20727 → 21441 → 21550 → 21659 → Home).
 * მომხმარებლის ბარათზე დაჭერა იწყებს Face ID-ს: 4 მდგომარეობა × 0.8 წმ, შემდეგ მთავარი გვერდი.
 * პასკოდის 4 ციფრის აკრეფაც შეჰყავს აპში. მთავარ გვერდზე ონბორდინგი მხოლოდ შესვლის შემდეგ იწყება.
 */
const FACE_ID_STEPS = [
  { key: 'scan', src: faceScan, size: 70 },
  { key: 'checking', src: faceChecking, size: 80, spin: true },
  { key: 'circle', src: faceCircle, size: 70 },
  { key: 'check', src: faceCheck, size: 70 },
]
const STEP_MS = 800
const PASSCODE_LENGTH = 4
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'backspace']

export default function PreloginScreen() {
  const { navigate } = useNav()
  const [faceStep, setFaceStep] = useState(-1) // -1 — Face ID არ ჩანს
  const [code, setCode] = useState('')
  const [entering, setEntering] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (ms, fn) => timers.current.push(setTimeout(fn, ms))

  const enterApp = () => navigate('/', { replace: true })

  const startFaceId = () => {
    if (entering) return
    setEntering(true)
    FACE_ID_STEPS.forEach((_, i) => later(i * STEP_MS, () => setFaceStep(i)))
    later(FACE_ID_STEPS.length * STEP_MS, enterApp)
  }

  const pressKey = (key) => {
    if (entering) return
    if (key === 'backspace') return setCode((c) => c.slice(0, -1))
    const next = (code + key).slice(0, PASSCODE_LENGTH)
    setCode(next)
    if (next.length === PASSCODE_LENGTH) {
      setEntering(true)
      later(300, enterApp)
    }
  }

  const step = FACE_ID_STEPS[faceStep]

  return (
    <div className={styles.screen}>
      <img className={styles.background} src={background} alt="" />
      <div className={styles.overlay} />

      <header className={styles.nav}>
        <button type="button" className={`${styles.navButton} pressable`} aria-label="უკან">
          <img src={chevronLeft} width="16" height="16" alt="" />
        </button>
        <span className={styles.navSpacer} />
        <button type="button" className={`${styles.navButton} pressable`} aria-label="ჩატი">
          <img src={chatIcon} width="16" height="16" alt="" />
        </button>
        <button type="button" className={`${styles.navButton} pressable`} aria-label="მეტი">
          <img src={moreIcon} width="16" height="16" alt="" />
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.userWrap}>
          <button type="button" className={`${styles.user} pressable`} onClick={startFaceId}>
            <span className={styles.avatar}>
              <img src={avatar} alt="" />
            </span>
            <span className={styles.userText}>
              <span className={styles.greeting}>გამარჯობა</span>
              <span className={styles.name}>John</span>
            </span>
            <span className={`${styles.change} t-label-large-22`}>შეცვლა</span>
          </button>
        </div>

        <p className={`${styles.prompt} t-body-large`}>შეიყვანე მობილბანკის პასკოდი</p>

        <div className={styles.dots} aria-label={`შეყვანილია ${code.length} ციფრი`}>
          {Array.from({ length: PASSCODE_LENGTH }, (_, i) => (
            <span key={i} className={`${styles.dot} ${i < code.length ? styles.dotFilled : ''}`} />
          ))}
        </div>

        <div className={styles.keypad}>
          {KEYS.map((key, i) =>
            key === null ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                type="button"
                className={`${styles.key} ${key === 'backspace' ? styles.keyIcon : ''}`}
                aria-label={key === 'backspace' ? 'წაშლა' : key}
                onClick={() => pressKey(key)}
              >
                {key === 'backspace' ? <img src={backspaceIcon} width="24" height="24" alt="" /> : key}
              </button>
            ),
          )}
        </div>

        <button type="button" className={`${styles.forgot} t-label-medium pressable`}>
          არ მახსოვს პასკოდი
        </button>
      </main>

      {/* Face ID (iOS bezel): შავი 145×145, radius 40 */}
      {step && (
        <div className={styles.faceId} role="status" aria-label="Face ID">
          <img
            key={step.key}
            className={`${styles.faceIcon} ${step.spin ? styles.spin : ''}`}
            src={step.src}
            width={step.size}
            height={step.size}
            alt=""
          />
        </div>
      )}
    </div>
  )
}
