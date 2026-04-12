import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ConfigAdvisor from './components/ConfigAdvisor';
import RPCDoctor from './components/RPCDoctor';
import { Server, Activity, Sun, Moon } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  // Initialize state from localStorage or default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : true;
    }
    return true;
  });

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed navigation bar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Sync dark mode state to HTML document and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    // ADDED: min-h-screen w-full flex flex-col to fix the black bar
    <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#030303] text-slate-800 dark:text-white/80 font-sans tracking-wide relative overflow-x-hidden transition-colors duration-700 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200">

      {/* High-Fidelity Futurism: Atmospheric Background Effects */}
      <div className="fixed top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-400/20 dark:bg-violet-900/10 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-transform duration-1000"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/20 dark:bg-cyan-900/10 blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-transform duration-1000"></div>

      {/* Glassmorphic Navigation (Sticky Scroll Spy) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl px-2 py-2 bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl border border-slate-200 dark:border-white/[0.05] rounded-full shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-700">
        <div className="flex items-center justify-between">
          <div className="pl-4 flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-lg dark:group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-500">
              <span className="font-black text-white dark:text-black text-xs tracking-tighter">N</span>
            </div>
            <span className="font-light text-xs tracking-[0.3em] text-slate-900 dark:text-white/90 hidden sm:block uppercase">Nodex</span>
          </div>

          <div className="flex items-center space-x-1 pr-1">
            <button onClick={() => scrollTo('advisor')} className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${activeSection === 'advisor' ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white shadow-inner dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/[0.02]'}`}>
              <Server size={14} /> <span className="hidden sm:inline">Procurement</span>
            </button>
            <button onClick={() => scrollTo('doctor')} className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${activeSection === 'doctor' ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white shadow-inner dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/80 hover:bg-slate-100 dark:hover:bg-white/[0.02]'}`}>
              <Activity size={14} /> <span className="hidden sm:inline">Telemetry</span>
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-white/10 mx-2 transition-colors duration-700"></div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-all focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Continuous Scroll */}
      <main className="relative z-10 flex-grow flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <LandingPage scrollTo={scrollTo} />
        </section>
        <section id="advisor" className="min-h-screen flex items-center justify-center py-20 border-t border-slate-200 dark:border-white/[0.02] transition-colors duration-700">
          <ConfigAdvisor />
        </section>
        <section id="doctor" className="min-h-screen flex items-center justify-center py-20 border-t border-slate-200 dark:border-white/[0.02] transition-colors duration-700">
          <RPCDoctor />
        </section>
      </main>

      {/* Swiss Minimalist Footer */}
      <footer className="relative z-10 mt-auto border-t border-slate-200 dark:border-white/[0.05] bg-white/60 dark:bg-[#030303]/80 backdrop-blur-xl py-12 transition-colors duration-700">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <span className="font-extralight text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/50 transition-colors duration-700">Systems Operational</span>
            </div>

            {/* Social Links with Native SVGs */}
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-4 md:pt-0 md:pl-6 transition-colors duration-700">
              <a href="https://github.com/AEdgecombe" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                <GithubIcon size={16} className="group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <span className="text-[10px] uppercase tracking-widest font-light hidden sm:block">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/alexedgecombe/" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-white/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                <LinkedinIcon size={16} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] dark:group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] uppercase tracking-widest font-light hidden sm:block">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-extralight text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-white/30 transition-colors duration-700">University of Portsmouth • Final Year Project</p>
            <p className="font-light text-xs tracking-widest text-slate-600 dark:text-white/50 mt-1 transition-colors duration-700">Alex Edgecombe (UP2124153)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;