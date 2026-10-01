import React, { useState } from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

export default function Achievements() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [activeImage, setActiveImage] = useState(null)

  // Easily add image URLs (local assets or external links) to any achievement object
  const achievements = [
    {
      id: 1,
      title: 'Can You Hack It Hackathon',
      role: 'Overall Winner & CLI Track Winner',
      category: 'Hackathons',
      date: 'Sep 2026',
      description: 'Built HackMe44, an end-to-end command-line interface tool built with Commander.js during a 24-hour hackathon.',
      tags: ['Node.js', 'CLI', 'Winner'],
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', // Replace with your image link
      proofLink: '#'
    },
    {
      id: 2,
      title: 'IIT Roorkee E-Summit 2026',
      role: '1st Runner-Up — General Championship',
      category: 'Competitions',
      date: 'Feb 2026',
      description: 'Represented IIITDM Jabalpur E-Cell as part of the Mind the Product team, securing second position overall.',
      tags: ['Product Management', 'Strategy', 'Pitching'],
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // Replace with your image link
      proofLink: '#'
    },
    {
      id: 3,
      title: 'Bharatiya Antariksh Hackathon 2026',
      role: 'Official Finalist & Participant',
      category: 'Hackathons',
      date: 'Aug 2026',
      description: 'Participated as part of Team Liftoff in the national space-technology hackathon organized by ISRO and Hack2skill.',
      tags: ['ISRO', 'Space Tech', 'Team Liftoff'],
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // Replace with your image link
      proofLink: '#'
    },
    {
      id: 4,
      title: 'Flipkart GRiD 8.0',
      role: 'Round 2 Qualified',
      category: 'Competitions',
      date: 'Jul 2026',
      description: 'Cleared Round 1 screening and completed the Round 2 proctored online technical assessment.',
      tags: ['Problem Solving', 'Data Structures', 'Algorithms'],
      imageUrl: null, // Set to null if no image is available
      proofLink: '#'
    }
  ]

  const categories = ['All', ...new Set(achievements.map((item) => item.category))]

  const filteredAchievements = selectedFilter === 'All'
    ? achievements
    : achievements.filter((item) => item.category === selectedFilter)

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans relative overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto my-auto w-full py-12 md:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 bg-white/70 text-xs font-semibold text-neutral-700 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Milestones & Recognition
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-4 leading-none">
            Honors & <br />
            <span className="italic font-serif font-normal text-neutral-700 text-3xl sm:text-5xl md:text-6xl">
              key achievements
            </span>
          </h1>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === cat
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAchievements.map((item) => (
            <Magnetic key={item.id} strength={0.08} cursorText="PREVIEW" className="w-full">
              <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-black/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full group">
                
                <div>
                  {/* Top Header: Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-black transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-700 mb-4">
                    {item.role}
                  </p>

                  {/* Optional Image Preview Container */}
                  {item.imageUrl && (
                    <div 
                      onClick={() => setActiveImage(item.imageUrl)}
                      className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer group/img"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-medium text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                          Expand Certificate ↗
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-100 text-neutral-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  {item.imageUrl ? (
                    <button
                      onClick={() => setActiveImage(item.imageUrl)}
                      className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
                    >
                      <span>View Attachment</span>
                      <span>📷</span>
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-400 italic">No image attached</span>
                  )}

                  {item.proofLink && (
                    <a
                      href={item.proofLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                    >
                      <span>Verify</span>
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
                  )}
                </div>

              </div>
            </Magnetic>
          ))}
        </div>

      </main>

      {/* Lightbox / Image Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-white text-sm font-semibold hover:text-neutral-300 transition-colors bg-white/10 px-4 py-2 rounded-full"
            >
              Close ✕
            </button>
            <img
              src={activeImage}
              alt="Achievement Proof"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  )
}