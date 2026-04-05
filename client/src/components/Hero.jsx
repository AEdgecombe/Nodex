import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Solana Infrastructure Optimiser
      </h1>
      
      <p className="max-w-2xl text-xl text-slate-400 mb-10 leading-relaxed">
        Bridging the gap between protocol theory and high-performance validator management. 
        Automated hardware diagnostics for the 400ms block production era.
      </p>
      
      <div className="flex gap-4 mb-16">
        <a 
          href="https://github.com/AEdgecombe/solana-config-advisor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-full transition-all border border-slate-700"
        >
          View GitHub
        </a>
      </div>

      <a href="#config" className="animate-bounce text-indigo-400 font-bold">
        Scroll to Advisor ↓
      </a>
    </div>
  );
};

export default Hero;