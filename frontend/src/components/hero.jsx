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