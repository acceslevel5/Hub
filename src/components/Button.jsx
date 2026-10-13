import styles from './Button.module.css'

/* Secondary-grey ღილაკი, h32 / radius 8 / label medium */
export default function Button({ children, onClick, fullWidth = false, className = '' }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${fullWidth ? styles.full : ''} pressable t-label-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
