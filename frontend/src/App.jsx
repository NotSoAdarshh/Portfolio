import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CursorProvider, CustomCursor } from './components/cursor'

// Import pages
import Home from './components/hero'
import Contact from './components/contact'
import Achievements from './components/achievements'
import Projects from './components/projects'
import About from './components/about'

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor size={24} lerpAmount={0.12} baseColor="#ffffff" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About />} />
          <Route path="/achievements" element={<Achievements/>} />
          <Route path="/projects" element={<Projects/>} />
          
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  )
}