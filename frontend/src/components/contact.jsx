import React from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

function Contact() {
  const email = 'adarshdeshmukh00000@gmail.com'

  const socials = [
    {
      name: 'GitHub',
      handle: '@NotSoAdarshh',
      url: 'https://github.com/NotSoAdarshh',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      handle: 'Adarsh Deshmukh',
      url: 'https://www.linkedin.com/in/adarsh-deshmukh-608539359/',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@not_soo_adarshh',
      url: 'https://www.instagram.com/not_soo_adarshh?stkn=MXdycWRlYmZ4MWJlbQ==',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans relative overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Contact Container */}
      <main className="max-w-4xl mx-auto my-auto w-full py-12 md:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 bg-white/70 text-xs font-semibold text-neutral-700 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available for new opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-4 leading-none">
            Let’s start a <br />
            <span className="italic font-serif font-normal text-neutral-700 text-3xl sm:text-5xl md:text-6xl">
              conversation together
            </span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Have a project in mind, an open-source collaboration, or just want to say hi? Feel free to reach out across any of my socials.
          </p>
        </div>

        {/* Quick Info & Social Cards Stack */}
        <div className="space-y-6">
          
          {/* Direct Email Compose Card */}
          <a 
            href={`mailto:${email}`}
            className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 block"
          >
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">
                Direct Email
              </span>
              <span className="text-base sm:text-xl font-bold text-neutral-900 group-hover:text-black transition-colors break-all">
                {email}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-5 py-3 rounded-full bg-neutral-950 text-white shrink-0 group-hover:bg-neutral-800 transition-colors">
              <span>Compose Mail</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
            </span>
          </a>

          {/* Social Links Cards */}
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-4 ml-2">
              Social Profiles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {socials.map((social) => (
                <Magnetic key={social.name} strength={0.15} cursorText="VISIT" className="w-full">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-3xl bg-white border border-black/5 hover:border-black/20 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-neutral-800 group-hover:text-black transition-colors">
                        <span className="text-neutral-700 group-hover:text-black transition-colors">
                          {social.icon}
                        </span>
                        <span className="text-sm font-bold">
                          {social.name}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">
                      {social.handle}
                    </span>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Contact