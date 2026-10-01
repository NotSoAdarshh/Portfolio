import React from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

function Contact() {
  const email = 'adarsh.deshmukh@iiitdmj.ac.in'

  const socials = [
    { name: 'GitHub', handle: '@adarsh-deshmukh', url: 'https://github.com' },
    { name: 'LinkedIn', handle: 'Adarsh Deshmukh', url: 'https://linkedin.com' },
    { name: 'Twitter / X', handle: '@adarsh_deshmukh', url: 'https://twitter.com' },
    { name: 'Instagram', handle: '@adarsh_deshmukh', url: 'https://instagram.com' }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {socials.map((social) => (
                <Magnetic key={social.name} strength={0.15} cursorText="VISIT" className="w-full">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-3xl bg-white border border-black/5 hover:border-black/20 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-neutral-900 group-hover:text-black transition-colors">
                        {social.name}
                      </span>
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