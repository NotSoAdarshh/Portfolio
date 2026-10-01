import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useCursor } from './CursorContext'

export default function Magnetic({
  children,
  strength = 0.25,
  springDuration = 1,
  springEase = 'elastic.out(1, 0.3)',
  cursorText = '',
  cursorVariant = 'hover',
  className = '',
  as: Component = 'div',
  ...props
}) {
  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const { setHovered, clearHovered } = useCursor()

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current || container
    if (!container || !inner) return

    // High performance gsap.quickTo setters for physics spring
    const xTo = gsap.quickTo(inner, 'x', {
      duration: springDuration,
      ease: springEase,
    })
    const yTo = gsap.quickTo(inner, 'y', {
      duration: springDuration,
      ease: springEase,
    })

    const onPointerOver = () => {
      setHovered(container, cursorVariant, cursorText)
    }

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)

      xTo(x * strength)
      yTo(y * strength)
    }

    const onPointerOut = () => {
      clearHovered()
      xTo(0)
      yTo(0)
    }

    container.addEventListener('pointerover', onPointerOver)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerout', onPointerOut)

    return () => {
      container.removeEventListener('pointerover', onPointerOver)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerout', onPointerOut)
      gsap.killTweensOf(inner)
    }
  }, [strength, springDuration, springEase, cursorText, cursorVariant, setHovered, clearHovered])

  return (
    <Component
      ref={containerRef}
      className={`relative inline-block ${className}`}
      {...props}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </Component>
  )
}
