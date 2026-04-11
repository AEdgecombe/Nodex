import React from 'react';
import { Server, Activity } from 'lucide-react';

const LandingPage = ({ scrollTo }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center animate-in fade-in duration-1000">
      
      {/* Hero Badge */}
      <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8 inline-flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)] animate-pulse"></span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-light">Agave Mainnet Ready</span>
      </div>

      {/* Massive Fluid Typography */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 drop-shadow-2xl">
        Solana Architecture <br className="hidden md:block"/>
        <span className="font-light italic pr-4 bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent">Refined.</span>
      </h1>

      <p className="max-w-2xl text-sm md:text-base font-light tracking-wide text-white/40 leading-relaxed mb-16">
        A high-fidelity diagnostic suite engineered for node operators. Validate bare-metal hardware procurement, execute DDoS vector audits, and monitor real-time JSON-RPC telemetry.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl mx-auto">
        <button 
          onClick={() => scrollTo('advisor')}
          className="flex-1 group relative p-px rounded-2xl bg-gradient-to-b from-white/20 to-white/5 hover:from-violet-500/50 hover:to-cyan-500/50 transition-all duration-700"
        >
          <div className="absolute inset-0 bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
          <div className="relative h-full bg-[#050505] rounded-[15px] p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 group-hover:bg-[#080808]">
            <Server className="text-violet-400 group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={1} />
            <div>
              <h3 className="font-light tracking-widest uppercase text-xs text-white">Procurement</h3>
              <p className="text-[10px] text-white/40 tracking-wider mt-2">Hardware Validation</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => scrollTo('doctor')}
          className="flex-1 group relative p-px rounded-2xl bg-gradient-to-b from-white/20 to-white/5 hover:from-cyan-500/50 hover:to-violet-500/50 transition-all duration-700"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
          <div className="relative h-full bg-[#050505] rounded-[15px] p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 group-hover:bg-[#080808]">
            <Activity className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={1} />
            <div>
              <h3 className="font-light tracking-widest uppercase text-xs text-white">Telemetry</h3>
              <p className="text-[10px] text-white/40 tracking-wider mt-2">Network Diagnostics</p>
            </div>
          </div>
        </button>
      </div>

    </div>
  );
};

export default LandingPage;