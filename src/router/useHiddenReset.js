import { useEffect } from 'react'

/*
 * რისერჩერისთვის დამალული reset: ეკრანის ზედა მარცხენა კუთხეზე ~2 წამიანი დაჭერა.
 * არაფერს ხატავს და არც სხვა ელემენტების დაჭერას ბლოკავს (capture-ფაზაში უსმენს).
 */
// ზონა აპის ჩარჩოს ზედა მარცხენა კუთხიდან; სიმაღლე notch/safe-area-საც ფარავს
const ZONE_X = 80
const ZONE_Y = 120
const HOLD_MS = 2000
const MOVE_TOLERANCE = 12

export function useHiddenReset(rootEl, onReset) {
  useEffect(() => {
    if (!rootEl) return
    let timer = null
    let start = null

    const cancel = () => {
      clearTimeout(timer)
      timer = null
      start = null
    }

    const onDown = (e) => {
      const rect = rootEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x > ZONE_X || y > ZONE_Y) return
      start = { x: e.clientX, y: e.clientY }
      timer = setTimeout(() => {
        cancel()
        navigator.vibrate?.(30)
        onReset()
      }, HOLD_MS)
    }

    const onMove = (e) => {
      if (!start) return
      if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > MOVE_TOLERANCE) cancel()
    }

    rootEl.addEventListener('pointerdown', onDown, true)
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', cancel, true)
    window.addEventListener('pointercancel', cancel, true)
    return () => {
      cancel()
      rootEl.removeEventListener('pointerdown', onDown, true)
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', cancel, true)
      window.removeEventListener('pointercancel', cancel, true)
    }
  }, [rootEl, onReset])
}
