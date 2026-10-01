import { createContext, useContext, useState, useRef, useCallback } from 'react'

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default') // 'default' | 'hover' | 'text' | 'hidden'
  const hoverTargetRef = useRef(null)

  const setHovered = useCallback((element, variant = 'hover', text = '') => {
    hoverTargetRef.current = element
    setCursorVariant(variant)
    setCursorText(text)
  }, [])

  const clearHovered = useCallback(() => {
    hoverTargetRef.current = null
    setCursorVariant('default')
    setCursorText('')
  }, [])

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorVariant,
        hoverTargetRef,
        setHovered,
        clearHovered,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
