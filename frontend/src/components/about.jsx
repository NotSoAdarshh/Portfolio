import React from 'react'
import { Magnetic } from '../components/cursor'
import Navbar from '../components/navbar'

export default function About() {
  const techStack = [
  { category: 'Languages', skills: ['C++', 'Python', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SQL'] },
  { category: 'Frameworks & Libraries', skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS ', 'REST API design'] },
  { category: 'Tools & Platforms', skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Figma', 'Linux','MongoDB', 'MySQL'] }
]

  const experiences = [
    {
      role: 'Social Media Lead & Coordinator',
      organization: 'E-Cell & IIC, IIITDM Jabalpur',
      period: 'Jul 2026 – Present',
      bullets: [
        'Presided over a committee of 35 members, overseeing operations and team coordination across multiple flagship campus initiatives.',
        'Spearheaded the conduction of key events and represented the institute during visits to prominent national and international events, including premier E-Summits.',
        'Served as Event Coordinator for Lights, Camera, Advertise!—an ad-making competition—driving strategic promotional campaigns that boosted overall engagement by ~25% year-over-year while managing logistics for campus hackathons like the SIH Internal Hackathon.'
      ]
    },
    {
      role: 'AI/ML Wing Member & Repo Maintainer',
      organization: 'Electronics & Robotics Society (ERS)',
      period: 'Aug 2026 – Present',
      bullets: [
        'Served as official GitHub repository maintainer, overseeing codebase management, code reviews, and the continuous maintenance and deployment of all society websites and web applications.',
        'Developed a full-stack inventory management web application for society resource tracking, while contributing to core AI/ML initiatives like RAG pipelines and chatbot architectures.'
      ]
    },
    {
      role: 'Teacher',
      organization: 'Jagrati - A Student led Voluntary Organisation',
      period: 'Sept 2025 – Present',
      bullets: [
        'Dedicated 110+ hours of volunteering, teaching and mentoring over 150+ underprivileged students across rural outreach drives.',
        'Mentored candidates for competitive entrance examinations, achieving 5+ successful student selections into Jawahar Navodaya Vidyalaya Exams.',
        'Organized community welfare initiatives, including blood donation drives, clothing donation campaigns, and outreach visits to local old-age homes.'
      ]
    }
  ]

  return (
    <div className="min-h-screen w-screen bg-[#f2f2f2] text-neutral-900 flex flex-col justify-between p-8 md:p-16 select-none font-sans relative overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar title="Adarsh Deshmukh" subtitle="MERN Stack Dev" />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto my-auto w-full py-12 md:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 bg-white/70 text-xs font-semibold text-neutral-700 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Background & Philosophy
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-4 leading-none">
            Passionate about <br />
            <span className="italic font-serif font-normal text-neutral-700 text-3xl sm:text-5xl md:text-6xl">
              building intuitive digital experiences
            </span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            I’m an undergraduate student studying Electronics & Communication Engineering at IIITDM Jabalpur. I specialize in full-stack web development with the MERN stack, crafting performant web tools, interactive user interfaces, writing scalable and deployable code, and exploring AI-driven web architectures.
          </p>
        </div>

        {/* Bio & Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="w-full md:col-span-2">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-2">
                  My Approach
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                  Clean code, fluid interaction & problem solving
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Whether it’s developing full-stack web applications, building automation tools, or contributing to open-source software, I enjoy taking ideas from initial concepts to polished product releases.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-2">
                  Education
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  PDPM IIITDM Jabalpur
                </h3>
                <p className="text-xs font-mono text-neutral-500 mb-3">
                  B.Tech in ECE
                </p>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Balancing core coursework in digital signal systems and hardware mechanics alongside practical expertise in full-stack web development and C++ data structures and algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stack Grid */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-4 ml-2">
            Technical Stack
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((group, index) => (
              <div key={index} className="w-full">
                <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-all h-full">
                  <h4 className="text-sm font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Involvement */}
        <div>
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-4 ml-2">
            Leadership & Campus Community
          </span>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="w-full">
                <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-semibold text-neutral-500 block mb-3">
                      {exp.organization}
                    </span>
                    {exp.bullets ? (
                      <ul className="list-disc list-inside text-xs text-neutral-600 max-w-2xl leading-relaxed space-y-1.5">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-neutral-400 shrink-0 px-3 py-1 bg-neutral-100 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}