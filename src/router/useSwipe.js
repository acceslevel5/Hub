import { useEffect } from 'react'

/*
 * ჰორიზონტალური სვაიპის ამოცნობა (touch + mouse).
 * - მიმართულება პირველი ~10px-ის შემდეგ ფიქსირდება; ვერტიკალური სქროლი არ ირღვევა
 * - სვაიპი, რომელიც ჰორიზონტალურად სქროლვად ელემენტში (სთორიები, კარუსელი) იწყება, იგნორირდება
 */
const LOCK_DISTANCE = 10
const MIN_DISTANCE = 60
const FLICK_DISTANCE = 30
const FLICK_VELOCITY = 0.4 // px/ms

function startsInHorizontalScroller(target, root) {
  for (let el = target; el && el !== root; el = el.parentElement) {
    if (el.scrollWidth > el.clientWidth + 1) {
      const ox = getComputedStyle(el).overflowX
      if (ox === 'auto' || ox === 'scroll') return true
    }
  }
  return false
}

export function useSwipe(el, { onSwipeRight, onSwipeLeft } = {}) {
  useEffect(() => {
    if (!el || (!onSwipeRight && !onSwipeLeft)) return
    let s = null // { x, y, t, axis }

    const begin = (x, y, target) => {
      s = startsInHorizontalScroller(target, el) ? null : { x, y, t: performance.now(), axis: null }
    }
    const move = (x, y, e) => {
      if (!s) return
      const dx = x - s.x
      const dy = y - s.y
      if (!s.axis && Math.hypot(dx, dy) > LOCK_DISTANCE) s.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y'
      if (s.axis === 'y') s = null
      else if (s.axis === 'x' && e.cancelable) e.preventDefault()
    }
    const end = (x, isMouse = false) => {
      if (!s || s.axis !== 'x') return (s = null)
      const dx = x - s.x
      const v = Math.abs(dx) / Math.max(1, performance.now() - s.t)
      const ok = Math.abs(dx) > MIN_DISTANCE || (Math.abs(dx) > FLICK_DISTANCE && v > FLICK_VELOCITY)
      s = null
      if (!ok) return
      // mouse-ით სვაიპის შემდეგ ღილაკზე შემთხვევითი click არ უნდა მოხდეს (mouseup-ს მაშინვე მოსდევს)
      if (isMouse) {
        const block = (ev) => ev.stopPropagation()
        window.addEventListener('click', block, { capture: true, once: true })
        setTimeout(() => window.removeEventListener('click', block, { capture: true }), 0)
      }
      if (dx > 0) onSwipeRight?.()
      else onSwipeLeft?.()
    }

    const ts = (e) => e.touches.length === 1 ? begin(e.touches[0].clientX, e.touches[0].clientY, e.target) : (s = null)
    const tm = (e) => move(e.touches[0].clientX, e.touches[0].clientY, e)
    const te = (e) => end(e.changedTouches[0].clientX)
    const tc = () => (s = null)
    const md = (e) => e.button === 0 && begin(e.clientX, e.clientY, e.target)
    const mm = (e) => move(e.clientX, e.clientY, e)
    const mu = (e) => end(e.clientX, true)

    el.addEventListener('touchstart', ts, { passive: true })
    el.addEventListener('touchmove', tm, { passive: false })
    el.addEventListener('touchend', te)
    el.addEventListener('touchcancel', tc)
    el.addEventListener('mousedown', md)
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', mu)
    return () => {
      el.removeEventListener('touchstart', ts)
      el.removeEventListener('touchmove', tm)
      el.removeEventListener('touchend', te)
      el.removeEventListener('touchcancel', tc)
      el.removeEventListener('mousedown', md)
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('mouseup', mu)
    }
  }, [el, onSwipeRight, onSwipeLeft])
}
