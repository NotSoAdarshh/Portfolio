import React, { useState, useEffect } from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('All')

  useEffect(() => {
    const controller = new AbortController()

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to fetch projects (Status: ${response.status})`)
        }
        const data = await response.json()
        setProjects(data.projects || [])
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

    fetchProjects()

    return () => controller.abort()
  }, [])

  // Extract unique languages for filter tabs
  const languages = ['All', ...new Set(projects.map(p => p.language).filter(Boolean))]

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(p => p.language === selectedFilter)

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans relative overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto my-auto w-full py-12 md:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 bg-white/70 text-xs font-semibold text-neutral-700 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
            Open Source, Collaborative & Personal Works
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-4 leading-none">
            Featured <br />
            <span className="italic font-serif font-normal text-neutral-700 text-3xl sm:text-5xl md:text-6xl">
              software & engineering
            </span>
          </h1>

          {/* Language Filters */}
          {!loading && !error && languages.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedFilter(lang)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    selectedFilter === lang
                      ? 'bg-neutral-950 text-white shadow-md'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-black/5'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-8 rounded-3xl bg-white/60 border border-black/5 animate-pulse h-64">
                <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
                <div className="h-8 bg-neutral-200 rounded-full w-1/4 mt-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center p-12 bg-white rounded-3xl border border-black/5">
            <p className="text-neutral-500 text-sm mb-4">Unable to load repositories from backend API.</p>
            <span className="text-xs font-mono bg-red-50 text-red-600 px-3 py-1.5 rounded-full">{error}</span>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Magnetic key={project.id} strength={0.1} cursorText="VIEW" className="w-full">
                <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-black/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
                  
                  <div>
                    {/* Header line: Language badge & Stars/Forks */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: project.languageColor || '#858585' }}
                        ></span>
                        <span className="text-xs font-semibold text-neutral-600">
                          {project.language || 'Other'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
                        <span>★ {project.stars ?? 0}</span>
                        <span>⌥ {project.forks ?? 0}</span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2 group-hover:text-black transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Topics / Tags */}
                    {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.topics.map((topic) => (
                          <span 
                            key={topic} 
                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-100 text-neutral-600"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions / Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                    >
                      <span>Repository</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
                      >
                        <span>Live Demo</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>

                </div>
              </Magnetic>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}