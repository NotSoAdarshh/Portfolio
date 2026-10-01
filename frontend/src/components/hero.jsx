import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

export default function Home() {
  const [stats, setStats] = useState({ repos: 0, forks: 0, commits: 0, mergedPRs: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to fetch stats (Status: ${response.status})`)
        }
        const data = await response.json()
        if (data.stats) {
          setStats(data.stats)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    return () => controller.abort()
  }, [])

  const statCards = [
    { label: 'Repos', value: stats.repos },
    { label: 'Forks', value: stats.forks },
    { label: 'Commits', value: stats.commits },
    { label: 'Merged PRs', value: stats.mergedPRs }
  ]

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans overflow-x-hidden">
      {/* Reusable Navbar matching custom cursor & Cuberto aesthetic */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Hero Showcase */}
      <main className="max-w-4xl mx-auto my-auto text-center py-16 w-full">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6 leading-tight">
          Adarsh Deshmukh <br />
          <span className="italic font-serif font-normal text-neutral-700 text-2xl sm:text-3xl md:text-3xl">
            Sophomore @ IIITDM - Jabalpur, MERN Stack developer
          </span>
        </h1>

        {/* Interactive Showcase Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Magnetic strength={0.3}>
            <Link
              to="/projects"
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
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-300 font-medium text-sm text-neutral-900 shadow-sm hover:border-neutral-400 transition-all"
            >
              <span>Get in Touch</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.3}>
            <Link
              to="/achievements"
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
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-300 font-medium text-sm text-neutral-900 shadow-sm hover:border-neutral-400 transition-all"
            >
              <span>About Me</span>
            </Link>
          </Magnetic>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          {statCards.map((card, idx) => (
            <Magnetic key={idx} strength={0.12} cursorText="VIEW" className="w-full">
              <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center h-full">
                {loading ? (
                  <div className="animate-pulse flex flex-col items-center w-full">
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-neutral-900 mt-2 mb-2">
                      {error ? '—' : card.value}
                    </h3>
                    <p className="text-sm text-neutral-600">{card.label}</p>
                  </>
                )}
              </div>
            </Magnetic>
          ))}
        </div>
      </main>
    </div>
  )
}