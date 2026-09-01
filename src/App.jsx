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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 px-8 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tight">Obasi-sam Otei</div>
        <ul className="flex space-x-8 text-sm font-semibold text-gray-600">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">About</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Skills</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Projects</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Backend Developer & <br/> Chemical Engineering Student
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building robust REST APIs, managing relational databases, and bridging the gap between industrial systems and modern web architecture.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View My Work
            </button>
            <button className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Contact Me
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mt-24 text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Backend */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Backend & Database</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>Python & Django</li>
                <li>PostgreSQL</li>
                <li>RESTful API Architecture</li>
              </ul>
            </div>
            
            {/* Frontend & DevOps */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Tools & Frontend</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>React & Tailwind CSS</li>
                <li>Docker & Kubernetes</li>
                <li>Git & GitHub Actions</li>
              </ul>
            </div>

            {/* Engineering */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Industrial Engineering</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>Chemical Process Simulation</li>
                <li>UniSim Modeling</li>
                <li>Quantitative Analysis</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section className="mt-24 border-t border-gray-200 pt-16 text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Projects</h2>
          
          {projects.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
              <p className="mt-1 text-gray-500">Live database is currently empty. Waiting for entries from the Django admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <p className="text-blue-600 text-sm font-semibold mb-4">{project.tagline}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  <button className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App