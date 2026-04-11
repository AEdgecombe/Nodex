import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ConfigAdvisor from './components/ConfigAdvisor';
import RPCDoctor from './components/RPCDoctor';
import { Server, Activity } from 'lucide-react';

// Custom SVG Icons to bypass Lucide's brand logo removal
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection Observer to update the active nav pill as you scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } 
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-[#030303] text-white/80 font-sans tracking-wide relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* High-Fidelity Futurism: Atmospheric Background Effects */}
      <div className="fixed top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none mix-blend-screen transition-transform duration-1000"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none mix-blend-screen transition-transform duration-1000"></div>

      {/* Glassmorphic Navigation (Sticky Scroll Spy) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl px-2 py-2 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between">
          <div 
            className="pl-4 flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollTo('home')}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-500">
              <span className="font-black text-black text-xs tracking-tighter">S</span>
            </div>
            <span className="font-light text-xs tracking-[0.3em] text-white/90 hidden sm:block uppercase">
              Ops Suite
            </span>
          </div>
          
          <div className="flex space-x-1 pr-1">
            <button 
              onClick={() => scrollTo('advisor')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                activeSection === 'advisor' 
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'
              }`}
            >
              <Server size={14} /> <span className="hidden sm:inline">Procurement</span>
            </button>
            <button 
              onClick={() => scrollTo('doctor')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                activeSection === 'doctor' 
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'
              }`}
            >
              <Activity size={14} /> <span className="hidden sm:inline">Telemetry</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Continuous Scroll */}
      <main className="relative z-10 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <LandingPage scrollTo={scrollTo} />
        </section>

        <section id="advisor" className="min-h-screen flex items-center justify-center py-20 border-t border-white/[0.02]">
          <ConfigAdvisor />
        </section>

        <section id="doctor" className="min-h-screen flex items-center justify-center py-20 border-t border-white/[0.02]">
          <RPCDoctor />
        </section>

      </main>

      {/* Swiss Minimalist Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-[#030303]/80 backdrop-blur-xl py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <span className="font-extralight text-[10px] uppercase tracking-[0.3em] text-white/50">Systems Operational</span>
            </div>
            
            {/* Social Links with Native SVGs */}
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <a 
                href="https://github.com/AEdgecombe" 
                target="_blank" 
                rel="noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <GithubIcon size={16} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"/>
                <span className="text-[10px] uppercase tracking-widest font-light hidden sm:block">GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/alexedgecombe/" 
                target="_blank" 
                rel="noreferrer"
                className="text-white/30 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <LinkedinIcon size={16} className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"/>
                <span className="text-[10px] uppercase tracking-widest font-light hidden sm:block">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-extralight text-[10px] uppercase tracking-[0.2em] text-white/30">University of Portsmouth • Final Year Project</p>
            <p className="font-light text-xs tracking-widest text-white/50 mt-1">Alex Edgecombe (UP2124153)</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;