import { useState, useEffect } from 'react'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('https://portfolio-backend-dvyu.onrender.com/api/projects/')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-blue-200">
      {/* Navbar - Sleeker, added Resume button */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-black text-gray-900 tracking-tighter">Obasi-sam.</div>
        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-500">
            <li className="hover:text-blue-600 transition-colors cursor-pointer">About</li>
            <li className="hover:text-blue-600 transition-colors cursor-pointer">Projects</li>
          </ul>
          <button className="text-sm font-bold bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Resume
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-20">
        {/* Hero Section - Added gradient text and better typography */}
        <div className="text-left md:text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Backend Developer & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Systems Engineer.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10">
            Building robust REST APIs, managing relational databases, and bridging the gap between industrial chemical systems and modern web architecture.
          </p>
          <div className="flex flex-wrap justify-left md:justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
              View Projects
            </button>
            <button className="bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-full font-bold hover:border-gray-900 hover:bg-gray-50 transition-all">
              GitHub
            </button>
          </div>
        </div>

        {/* Skills Section - Upgraded to Pill Badges */}
        <section className="mt-32">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">Core Arsenal</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {['Python', 'Django', 'PostgreSQL', 'REST APIs', 'React', 'Tailwind CSS', 'Docker', 'Git & GitHub Actions', 'UniSim Modeling', 'Process Simulation'].map((skill) => (
              <span key={skill} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-bold shadow-sm hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section - Upgraded Card UI with Hover Lifts */}
        <section className="mt-32 border-t border-gray-100 pt-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Selected Work</h2>
              <p className="text-gray-500 mt-2">Production apps and architecture designs.</p>
            </div>
          </div>
          
          {projects.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Awaiting Database Entries</h3>
              <p className="mt-2 text-gray-500">Live Render database is currently empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <p className="text-blue-600 text-xs font-black uppercase tracking-wider mb-3">{project.tagline}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 whitespace-pre-line">{project.description}</p>
                  <div className="flex items-center text-sm font-bold text-gray-900">
                    Explore Architecture 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-gray-100 mt-20 py-10 text-center text-sm font-medium text-gray-400">
        <p>© 2026 Obasi-sam Otei. Built with React & Django.</p>
      </footer>
    </div>
  )
}

export default App