import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConfigAdvisor from './components/ConfigAdvisor';
import RPCDoctor from './components/RPCDoctor';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-950 text-white selection:bg-indigo-500/30 scroll-smooth">
      <Navbar />
      
      <section id="about">
        <Hero />
      </section>

      <section id="config" className="min-h-screen py-24 px-8 border-t border-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-indigo-400">01. Config Advisor</h2>
          <ConfigAdvisor />
        </div>
      </section>

      <section id="rpc" className="min-h-screen py-24 px-8 border-t border-slate-900 bg-slate-900/20 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">02. RPC Doctor</h2>
          <RPCDoctor />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;