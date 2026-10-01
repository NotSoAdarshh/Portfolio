import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useCursor } from './CursorContext'

const TEXT_TAGS = new Set([
  'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'SPAN', 'A', 'LI', 'LABEL', 'STRONG', 'EM',
  'BLOCKQUOTE', 'CODE', 'BUTTON',
])
const TEXT_SCALE = 1.06

export default function CustomCursor({ size = 20, lerpAmount = 0.12 }) {
  const cursorRef = useRef(null)
  const { cursorText, cursorVariant, hoverTargetRef } = useCursor()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const posRef      = useRef({ current: { x: -200, y: -200 }, previous: { x: -200, y: -200 }, target: { x: -200, y: -200 } })
  const scaleRef    = useRef({ current: 1, previous: 1, target: 1 })
  const isVisibleRef = useRef(false)
  const isHoveredRef = useRef(false)
  const cursorTextRef = useRef(cursorText)
  const scaledElRef  = useRef(null)

  // Keep refs in sync with context state
  useEffect(() => {
    isHoveredRef.current  = cursorVariant === 'hover' || cursorVariant === 'text'
    cursorTextRef.current = cursorText
  }, [cursorVariant, cursorText])

  // Main animation effect — runs once the ref is definitely attached
  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    // Poll briefly until the ref is attached (portal can lag one frame)
    let rafId
    function init() {
      const cursorEl = cursorRef.current
      if (!cursorEl) { rafId = requestAnimationFrame(init); return }

      // Start invisible, off-screen
      gsap.set(cursorEl, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 })

      function findTextEl(el) {
        if (!el || el === document.body) return null
        if (TEXT_TAGS.has(el.tagName)) return el
        return findTextEl(el.parentElement)
      }

      function scaleTextEl(el) {
        if (scaledElRef.current && scaledElRef.current !== el) {
          gsap.to(scaledElRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        }
        if (el && el !== scaledElRef.current) {
          gsap.to(el, { scale: TEXT_SCALE, duration: 0.25, ease: 'power2.out', overwrite: 'auto', transformOrigin: 'center center' })
        }
        scaledElRef.current = el ?? null
      }

      const onPointerMove = (e) => {
        const { clientX: x, clientY: y } = e

        if (!isVisibleRef.current) {
          isVisibleRef.current = true
          posRef.current.current  = { x, y }
          posRef.current.previous = { x, y }
          gsap.to(cursorEl, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        }

        if (isHoveredRef.current && hoverTargetRef.current) {
          const bounds = hoverTargetRef.current.getBoundingClientRect()
          const cx = bounds.left + bounds.width  / 2
          const cy = bounds.top  + bounds.height / 2
          const dx = x - cx, dy = y - cy

          posRef.current.target.x = cx + dx * 0.15
          posRef.current.target.y = cy + dy * 0.15

          const targetScale = cursorTextRef.current ? 3.8 : 2.2
          scaleRef.current.target = targetScale

          const angle    = Math.atan2(dy, dx) * (180 / Math.PI)
          const distance = Math.hypot(dx, dy) * 0.01
          gsap.set(cursorEl, { rotate: angle })
          gsap.to(cursorEl, {
            scaleX: targetScale + Math.pow(Math.min(distance, 0.6), 3) * 2,
            scaleY: targetScale - Math.pow(Math.min(distance, 0.3), 3) * 2,
            duration: 0.35, ease: 'power3.out', overwrite: 'auto',
          })
          scaleTextEl(null)
        } else {
          posRef.current.target.x = x
          posRef.current.target.y = y
          scaleRef.current.target = 1

          cursorEl.style.visibility = 'hidden'
          const elUnder = document.elementFromPoint(x, y)
          cursorEl.style.visibility = ''
          scaleTextEl(findTextEl(elUnder))
        }
      }

      const onPointerLeave = () => {
        isVisibleRef.current = false
        gsap.to(cursorEl, { opacity: 0, duration: 0.25 })
        scaleTextEl(null)
      }

      const onPointerEnter = () => {
        isVisibleRef.current = true
        gsap.to(cursorEl, { opacity: 1, duration: 0.25 })
      }

      const updateTicker = () => {
        const pos   = posRef.current
        const scale = scaleRef.current

        pos.current.x += (pos.target.x - pos.current.x) * lerpAmount
        pos.current.y += (pos.target.y - pos.current.y) * lerpAmount
        scale.current  = gsap.utils.interpolate(scale.current, scale.target, lerpAmount)

        const deltaX = pos.current.x - pos.previous.x
        const deltaY = pos.current.y - pos.previous.y
        pos.previous.x = pos.current.x
        pos.previous.y = pos.current.y

        gsap.set(cursorEl, { x: pos.current.x, y: pos.current.y })

        if (!isHoveredRef.current) {
          const angle    = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
          const distance = Math.hypot(deltaX, deltaY) * 0.04
          gsap.set(cursorEl, {
            rotate: angle,
            scaleX: scale.current + Math.min(distance, 0.8),
            scaleY: scale.current - Math.min(distance, 0.25),
          })
        }
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('mouseleave', onPointerLeave)
      document.addEventListener('mouseenter', onPointerEnter)
      gsap.ticker.add(updateTicker)

      // store cleanup on the ref so the outer return can call it
      cursorEl._cleanup = () => {
        window.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('mouseleave', onPointerLeave)
        document.removeEventListener('mouseenter', onPointerEnter)
        gsap.ticker.remove(updateTicker)
        scaleTextEl(null)
      }
    }

    rafId = requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(rafId)
      cursorRef.current?._cleanup?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isTouchDevice || cursorVariant === 'hidden') return null

  const hasText = Boolean(cursorText)

  const cursor = (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        width:           `${size}px`,
        height:          `${size}px`,
        borderRadius:    '9999px',
        pointerEvents:   'none',
        zIndex:          99999,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        userSelect:      'none',
        willChange:      'transform',
        transform:       'translate(-50%, -50%)',
        // WHITE fill + mix-blend-difference = text beneath inverts to white inside the circle
        backgroundColor: 'white',
        mixBlendMode:    'difference',
      }}
    >
      {hasText && (
        <span style={{
          fontSize:       '7px',
          textTransform:  'uppercase',
          fontWeight:     700,
          letterSpacing:  '0.12em',
          color:          'black',
          lineHeight:     1,
          userSelect:     'none',
          padding:        '0 4px',
          pointerEvents:  'none',
        }}>
          {cursorText}
        </span>
      )}
    </div>
  )

  // Render into body so mix-blend-difference works across the whole page
  return typeof document !== 'undefined'
    ? createPortal(cursor, document.body)
    : null
}
