import React from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans">
      {/* Reusable Navbar matching the custom cursor & Cuberto aesthetic */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Hero Showcase */}
      <main className="max-w-4xl mx-auto my-auto text-center py-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6 leading-tight">
          Adarsh Deshmukh <br />
          <span className="italic font-serif font-normal text-neutral-700 text-2xl sm:text-3xl md:text-3xl">
            Sophomore @ IIITDM - Jabalpur, MERN Stack developer
          </span>
        </h1>

        {/* Interactive Showcase Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Magnetic strength={0.3}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span>Explore Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-300 font-medium text-sm text-neutral-900 shadow-sm hover:border-neutral-400 transition-all"
            >
              <span>Get in Touch</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="#achievements"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span>Explore Achievements</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <Magnetic strength={0.12} cursorText="VIEW" className="w-full">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">17</h3>
              <p className="text-sm text-neutral-600">Repos</p>
            </div>
          </Magnetic>

          <Magnetic strength={0.12} cursorText="VIEW" className="w-full">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">17</h3>
              <p className="text-sm text-neutral-600">Forks</p>
            </div>
          </Magnetic>

          <Magnetic strength={0.12} cursorText="VIEW" className="w-full">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">17</h3>
              <p className="text-sm text-neutral-600">Commits</p>
            </div>
          </Magnetic>

          <Magnetic strength={0.12} cursorText="VIEW" className="w-full">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">17</h3>
              <p className="text-sm text-neutral-600">Merged PRs</p>
            </div>
          </Magnetic>
        </div>
      </main>
    </div>
  )
}