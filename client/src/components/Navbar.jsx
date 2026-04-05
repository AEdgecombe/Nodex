import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter text-indigo-400">UP2124153_SOLANA</div>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="#config" className="hover:text-indigo-400 transition-colors">Config Advisor</a>
          <a href="#rpc" className="hover:text-cyan-400 transition-colors">RPC Doctor</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;