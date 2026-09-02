import { useState, useEffect } from 'react'

// Custom Typewriter Engine
const TypewriterText = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return <>{displayText}</>;
};

function App() {
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState('home')
  const [selectedCert, setSelectedCert] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // --- Theme State Logic ---
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // --- Form State Logic ---
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formEndpoint = "https://formspree.io/f/xvkoabyk";

    const payload = {
      name: formData.name,
      email: formData.email,
      "Inquiry Topic": formData.subject, 
      message: formData.message
    };

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
        setTimeout(() => setFormStatus('idle'), 5000); 
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  }

  const experience = [
    {
      id: 1,
      role: "Backend Engineering Specialization",
      company: "ALX Africa",
      date: "2025",
      description: "Completed an intensive software engineering program focused on server-side architecture. Architected relational database schemas, developed secure RESTful APIs, and containerized applications for deployment.",
      skills: ["Python", "Django", "PostgreSQL", "REST APIs"]
    },
    {
      id: 2,
      role: "Industrial Process Trainee",
      company: "Marian Table Water",
      date: "2025",
      description: "Analyzed and documented the complete industrial fluid purification and production workflow. Bridged theoretical chemical engineering concepts with real-world physical systems and quality control.",
      skills: ["Process Flow", "Technical Documentation", "Industrial Systems"]
    }
  ];

  const education = [
    {
      id: 1,
      degree: "B.Eng in Chemical Engineering",
      school: "University of Calabar",
      date: "In Progress",
      description: "Studying core engineering principles, unit operations, and thermodynamics. Utilizing simulation tools like UniSim to model complex industrial reactors, heat exchangers, and physical data flows.",
      skills: ["Process Simulation", "Quantitative Analysis", "System Modeling"]
    }
  ];

  const certs = [
    {
      id: 1,
      title: "Software Engineering: ProDev Backend",
      issuer: "ALX Africa",
      dateIssued: "October 2025",
      image: "/alx-prodev.png", 
      skills: ["Backend Architecture", "Python", "Django", "PostgreSQL"],
      verified: true
    },
    {
      id: 2,
      title: "Professional Foundations",
      issuer: "ALX Africa",
      dateIssued: "June 2025",
      image: "/alx-foundations.png", 
      skills: ["Communication", "Problem Solving", "Professionalism", "Soft Skills"],
      verified: true
    }
  ];

  useEffect(() => {
    fetch('https://portfolio-backend-dvyu.onrender.com/api/projects/')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500/30 scroll-smooth pb-10 relative transition-colors duration-300">
      
      <nav className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 py-4 px-6 md:px-8 flex justify-between items-center transition-colors duration-300">
        
        <div 
          onClick={() => { setPage('home'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} 
          className="flex items-center gap-3 cursor-pointer group relative z-50"
        >
          <img src="/profile.jpg" alt="Obasi-sam Otei" className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 transition-colors" onError={(e) => e.target.src = 'https://via.placeholder.com/40'} />
          <div className="text-xl font-bold text-gray-900 dark:text-white tracking-tight whitespace-nowrap group-hover:text-blue-500 transition-colors">Obasi-sam Otei</div>
        </div>

        <ul className="hidden md:flex justify-center space-x-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <li onClick={() => { setPage('home'); window.scrollTo(0, 0); }} className={`cursor-pointer transition-colors ${page === 'home' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Home</li>
          <li onClick={() => { setPage('about'); window.scrollTo(0, 0); }} className={`cursor-pointer transition-colors ${page === 'about' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>About</li>
          <li onClick={() => { setPage('contact'); window.scrollTo(0, 0); }} className={`cursor-pointer transition-colors ${page === 'contact' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Contact</li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="p-2 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          
          {page !== 'resume' && (
             <button onClick={() => { setPage('resume'); window.scrollTo(0, 0); }} className="text-sm font-bold bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-5 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
               Resume
             </button>
          )}
          {page !== 'contact' && (
            <button onClick={() => { setPage('contact'); window.scrollTo(0, 0); }} className="text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Me
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative z-50"
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-[fadeIn_0.2s_ease-in-out]">
            <div onClick={() => { setPage('home'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className={`text-lg font-medium cursor-pointer ${page === 'home' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Home</div>
            <div onClick={() => { setPage('about'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className={`text-lg font-medium cursor-pointer ${page === 'about' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>About</div>
            <div onClick={() => { setPage('resume'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className={`text-lg font-medium cursor-pointer ${page === 'resume' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Resume</div>
            <button onClick={() => { setPage('contact'); window.scrollTo(0, 0); setIsMobileMenuOpen(false); }} className="w-full text-center font-bold bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-blue-700 transition-colors mt-2">
              Contact Me
            </button>
          </div>
        )}
      </nav>

      {/* ======================= HOME PAGE VIEW ======================= */}
      {page === 'home' && (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
          
          <main className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
              <div className="lg:col-span-7 text-left">
                <div className="flex flex-wrap items-center gap-2 text-blue-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  <span>ALX Backend Spec • Chem Eng Alumni</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] min-h-[90px] md:min-h-[160px]">
                  <TypewriterText text="Backend Developer." delay={100} speed={50} /> <br/>
                  <span className="text-blue-500 border-b-4 border-blue-500">
                    <TypewriterText text="I build systems that scale." delay={1200} speed={50} />
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
                  I build robust backend systems and APIs for modern applications, from healthcare platforms and AI assistants to data-driven services. I work primarily with Python, Django, PostgreSQL, and modern web infrastructure.
                </p>

                <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 mb-8 md:mb-10">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  Open to remote roles • UTC+1 (Calabar) 
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
                  <button onClick={() => { document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all w-full sm:w-auto">
                    View my work
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                  <button onClick={() => { setPage('resume'); window.scrollTo(0, 0); }} className="flex items-center justify-center gap-2 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all w-full sm:w-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Resume
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative mt-8 lg:mt-0 block w-full max-w-[320px] sm:max-w-md mx-auto lg:max-w-none">
                <div className="absolute -top-8 md:-top-10 right-0 text-[10px] md:text-xs text-gray-500 dark:text-gray-300 tracking-[0.25em] uppercase font-mono text-right font-semibold">
                  A Quiet Mind <br/> Obasi-sam Otei
                </div>
                <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] aspect-[4/5] shadow-2xl">
                  <img src="/profile.jpg" alt="Obasi-sam" className="w-full h-full object-cover opacity-90" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'} />
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-col gap-2">
                    <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-lg w-max uppercase tracking-widest shadow-lg">Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <section className="max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-24 pt-16 md:pt-20 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-blue-500 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">What I Do</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                I engineer the server-side logic that powers modern applications. From complex relational databases to seamless API integrations, I build the invisible infrastructure that makes software reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl hover:border-blue-500/50 transition-colors shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Backend Architecture</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Designing scalable backend systems using Python and Django. Handling complex data relationships, user authentication, and core application logic.</p>
              </div>
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl hover:border-blue-500/50 transition-colors shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">API Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Building robust RESTful APIs using Django REST Framework. Ensuring secure, seamless data flow between databases, frontends, and third-party services.</p>
              </div>
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl hover:border-blue-500/50 transition-colors shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Database Design</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Structuring normalized relational schemas in PostgreSQL and SQLite. Optimizing queries and ensuring long-term data integrity for production applications.</p>
              </div>
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl hover:border-blue-500/50 transition-colors shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Process Modeling</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">Applying chemical engineering principles to digital systems. Utilizing UniSim for process modeling, bridging quantitative analysis with software architecture.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-gray-200 dark:border-gray-800/50">
              <div>
                <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-2">Step_01</p>
                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Architecture</h4>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">System Planning</p>
              </div>
              <div>
                <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-2">Step_02</p>
                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Data Modeling</h4>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Schema Design</p>
              </div>
              <div>
                <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-2">Step_03</p>
                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Engineering</h4>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">API Implementation</p>
              </div>
              <div>
                <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-2">Step_04</p>
                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Deployment</h4>
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Container & Ship</p>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-24 pt-16 md:pt-20 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-blue-500 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Toolkit
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Technologies I Work With</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Backend Core</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Django', 'Django REST Framework', 'REST APIs', 'LLM Integration', 'WebSockets'].map(tech => (
                    <span key={tech} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-2 rounded-lg">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Data & Systems</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'SQLite', 'Relational Schemas', 'UniSim', 'Process Simulation', 'Quantitative Analysis'].map(tech => (
                    <span key={tech} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-2 rounded-lg">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">DevOps & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'Git & GitHub', 'Render', 'Vercel', 'Postman', 'Linux / Bash', 'React (Frontend)'].map(tech => (
                    <span key={tech} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-2 rounded-lg">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-24 border-t border-gray-200 dark:border-gray-800 pt-16 md:pt-20 pb-10">
            <div className="mb-10 text-center">
              <span className="text-blue-500 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Products
              </span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Production Logic</h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">Architecture built to stay up, not just to demo.</p>
            </div>
            
            {projects.length === 0 ? (
              <div className="bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl p-12 md:p-16 text-center">
                <p className="text-gray-500">Live Render database is currently empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group cursor-pointer shadow-sm dark:shadow-none">
                    <p className="text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-wider mb-3">{project.tagline}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{project.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 whitespace-pre-line">{project.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* ======================= ABOUT PAGE VIEW ======================= */}
      {page === 'about' && (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
          
          <section className="max-w-5xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-10">
            <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
              <div className="w-full md:w-1/3 max-w-[320px] mx-auto md:max-w-none">
                <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] aspect-[4/5] shadow-2xl">
                  <img src="/profile.jpg" alt="Obasi-sam" className="w-full h-full object-cover opacity-90" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'} />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">About Me</h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  I am a backend software engineer and systems architect based in Calabar, Nigeria. With a solid foundation in Chemical Engineering from the University of Calabar, my transition into software engineering was driven by a deep fascination with how complex systems operate—whether they are physical fluid pipelines or data-intensive web architectures.
                </p>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Recently, I completed the ALX Software Engineering program specializing in Backend Development. I focus on engineering resilient, scalable APIs and managing relational databases. Bridging quantitative logic with modern web infrastructure allows me to approach backend problems from a highly analytical perspective.
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-500 mb-8">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Calabar, Nigeria
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Backend Systems Engineer
                  </span>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => { setPage('resume'); window.scrollTo(0, 0); }} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors w-full sm:w-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 md:mb-12">Experience</h2>
            <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-12 pb-10">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 md:pl-8 group">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-gray-50 dark:ring-[#0a0a0a] group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all"></span>
                  <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-6 md:p-8 rounded-2xl group-hover:border-blue-500/50 transition-all duration-300 shadow-sm dark:shadow-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20 w-max">{exp.date}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{exp.company}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, index) => (
                        <span key={index} className="text-[10px] font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg uppercase tracking-wider">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 md:px-8 mt-8 pt-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 md:mb-12">Education</h2>
            <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-12 pb-10">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 md:pl-8 group">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-gray-50 dark:ring-[#0a0a0a] group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all"></span>
                  <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-6 md:p-8 rounded-2xl group-hover:border-blue-500/50 transition-all duration-300 shadow-sm dark:shadow-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20 w-max">{edu.date}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{edu.school}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, index) => (
                        <span key={index} className="text-[10px] font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg uppercase tracking-wider">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16 border-t border-gray-200 dark:border-gray-800 pt-16 pb-20">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 md:mb-12">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certs.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden group shadow-sm dark:shadow-none">
                  <div className="h-40 md:h-48 bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden relative border-b border-gray-200 dark:border-gray-800">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1589330694653-061a8f7fba01?auto=format&fit=crop&w=600&q=80'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-[#111] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="bg-blue-600 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight">{cert.title}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs md:text-sm text-gray-500">{cert.issuer} • {cert.dateIssued}</p>
                      {cert.verified && (
                        <div className="flex items-center text-green-600 dark:text-green-500 text-[10px] md:text-xs font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-md border border-green-200 dark:border-green-500/20">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ======================= RESUME PAGE VIEW ======================= */}
      {page === 'resume' && (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
          <main className="max-w-5xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-20">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">My Resume</p>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Backend Software Engineer</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
                  APIs, data models, and systems architecture built to scale. Python • Django • PostgreSQL.
                </p>
              </div>
              
              <div className="flex w-full md:w-auto gap-4">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Open in new tab
                </a>
                <a 
                  href="/resume.pdf" 
                  download="Obasi-sam_Otei_Resume.pdf" 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-900/20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Python', 'Django', 'PostgreSQL', 'Docker', 'REST APIs', 'Process Simulation'].map(tech => (
                <span key={tech} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1.5 rounded-md">{tech}</span>
              ))}
            </div>

            <div className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden h-[75vh] shadow-2xl">
              <iframe 
                src="/resume.pdf" 
                className="w-full h-full" 
                title="Obasi-sam Otei Resume"
              />
            </div>

          </main>
        </div>
      )}

      {/* ======================= CONTACT PAGE VIEW ======================= */}
      {page === 'contact' && (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
          <main className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-20">
            <div className="mb-10 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Get in Touch</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Have a project in mind? Let's engineer a solution.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
              
              <div className="lg:col-span-7">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm dark:shadow-none" 
                          placeholder="Your name" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm dark:shadow-none" 
                          placeholder="Your email" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm dark:shadow-none" 
                        placeholder="Project / Discussion / Collaboration" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Message</label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 flex items-start pl-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      </div>
                      <textarea 
                        rows="6" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm dark:shadow-none" 
                        placeholder="Tell me more here..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className={`w-full font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 
                      ${formStatus === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' : 
                        formStatus === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' : 
                        'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 
                     formStatus === 'success' ? 'Message Sent!' : 
                     formStatus === 'error' ? 'Failed to Send. Try Again.' : 
                     'Send message'}
                    {formStatus === 'idle' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    )}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">obasonz61@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Calabar, Nigeria <span className="text-[10px] text-gray-500 font-bold ml-1">NG</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Connect Online</h3>
                  <div className="flex gap-4">
                    <a href="https://github.com/obasi-1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://x.com/De_obason" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">System Status</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-gray-300">Response time:</strong> Actively taking on new engineering roles. I typically respond within 12-24 hours. For urgent matters, please indicate in your message subject.
                  </p>
                </div>

              </div>
            </div>
          </main>
        </div>
      )}

      {/* Global Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-8 border-t border-gray-200 dark:border-gray-800 mt-16 md:mt-20 py-10 text-center text-sm font-medium text-gray-500 dark:text-gray-600">
        <p>© 2026 Obasi-sam Otei. Engineered with React & Django.</p>
      </footer>

      {/* Certificate Modal Overlay */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.2s_ease-in-out]">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedCert(null)}></div>
          
          <div className="relative w-full max-w-5xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 max-h-[90vh] overflow-y-auto md:overflow-hidden">
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 transition-colors z-20">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="w-full md:w-3/5 bg-gray-50 dark:bg-[#111] p-4 md:p-6 flex items-center justify-center min-h-[250px] md:min-h-[300px]">
              <img src={selectedCert.image} alt={selectedCert.title} className="max-w-full max-h-[40vh] md:max-h-[70vh] object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-800/50" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1589330694653-061a8f7fba01?auto=format&fit=crop&w=800&q=80'} />
            </div>

            <div className="w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-center">
              <span className="text-blue-600 dark:text-blue-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">Professional</span>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">{selectedCert.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 md:mb-2">Issuer</p>
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    {selectedCert.issuer}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 md:mb-2">Date Issued</p>
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {selectedCert.dateIssued}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 md:mb-4">Targeted Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App