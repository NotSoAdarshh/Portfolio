import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'

export default function Home() {
  const [stats, setStats] = useState({ repos: 0, forks: 0, commits: 0, mergedPRs: 0 })
  const [contributions, setContributions] = useState([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [CalendarComponent, setCalendarComponent] = useState(null)

  // Dynamically load react-activity-calendar to prevent white screen if package is missing
  useEffect(() => {
    import('react-activity-calendar')
      .then((mod) => setCalendarComponent(() => mod.default))
      .catch((err) => console.warn('react-activity-calendar not installed yet:', err))
  }, [])

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
        if (Array.isArray(data.contributions)) {
          setContributions(data.contributions)
          setTotalContributions(data.totalContributions || 0)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Home stats fetch error:', err)
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

  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  }

  // Social Links Data
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/your-username', // Replace with your GitHub profile link
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/your-username', // Replace with your Instagram profile link
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/your-username', // Replace with your LinkedIn profile link
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans overflow-x-hidden">
      {/* Reusable Navbar */}
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
          <a
            href="/projects"
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

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-300 font-medium text-sm text-neutral-900 shadow-sm hover:border-neutral-400 transition-all"
          >
            <span>Get in Touch</span>
          </a>

          <a
            href="/achievements"
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

          <a
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-neutral-300 font-medium text-sm text-neutral-900 shadow-sm hover:border-neutral-400 transition-all"
          >
            <span>About Me</span>
          </a>
        </div>

        {/* Social Media Small Boxes */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="p-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:scale-105 shadow-sm transition-all flex items-center justify-center"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          {statCards.map((card, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center h-full">
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
          ))}
        </div>

        {/* GitHub Contributions Heatmap Section */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-lg font-bold text-neutral-900">GitHub Activity</h2>
            {!loading && !error && (
              <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                {totalContributions} contributions in last year
              </span>
            )}
          </div>

          {loading ? (
            <div className="w-full h-32 bg-neutral-100 animate-pulse rounded-2xl flex items-center justify-center">
              <span className="text-xs text-neutral-400">Loading contribution map...</span>
            </div>
          ) : error ? (
            <p className="text-xs text-neutral-400 italic">Unable to load contribution activity.</p>
          ) : CalendarComponent && contributions.length > 0 ? (
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <CalendarComponent
                data={contributions}
                theme={calendarTheme}
                labels={{
                  totalCount: '{{count}} contributions in the last year'
                }}
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          ) : (
            <p className="text-xs text-neutral-400 italic">
              {CalendarComponent ? 'No contribution data available.' : 'Run `npm install react-activity-calendar` in frontend folder.'}
            </p>
          )}
        </div>

      </main>
    </div>
  )
}