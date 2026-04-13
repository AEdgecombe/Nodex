import React from 'react';
import { Server, Activity } from 'lucide-react';

const STYLE = {
  container: "w-full flex flex-col justify-center items-center text-center animate-in fade-in duration-1000",
  badgeWrapper: "px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md mb-8 inline-flex items-center gap-3",
  badgeDot: "w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.4)] dark:shadow-[0_0_10px_rgba(139,92,246,0.8)] animate-pulse",
  badgeText: "text-[10px] uppercase tracking-[0.3em] text-slate-600 dark:text-white/60 font-light",
  heading: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/40 mb-6 drop-shadow-sm dark:drop-shadow-2xl transition-all duration-700 flex flex-col gap-1 md:gap-2",
  headingAccent: "font-light italic pr-4 bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 text-transparent",
  paragraph: "max-w-2xl text-sm md:text-base font-light tracking-wide text-slate-500 dark:text-white/40 leading-relaxed mb-16 transition-colors duration-700",
  cardGrid: "flex flex-col sm:flex-row gap-6 w-full max-w-xl mx-auto",
  btnBase: "flex-1 group relative p-px rounded-2xl transition-all duration-700",
  btnGradientProcurement: "bg-gradient-to-b from-slate-200 to-slate-100 dark:from-white/20 dark:to-white/5 hover:from-violet-400/50 hover:to-cyan-400/50 dark:hover:from-violet-500/50 dark:hover:to-cyan-500/50",
  btnGradientTelemetry: "bg-gradient-to-b from-slate-200 to-slate-100 dark:from-white/20 dark:to-white/5 hover:from-cyan-400/50 hover:to-violet-400/50 dark:hover:from-cyan-500/50 dark:hover:to-violet-500/50",
  btnGlowProcurement: "absolute inset-0 bg-violet-400/10 dark:bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl",
  btnGlowTelemetry: "absolute inset-0 bg-cyan-400/10 dark:bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl",
  btnInner: "relative h-full bg-white dark:bg-[#050505] rounded-[15px] p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 group-hover:bg-slate-50 dark:group-hover:bg-[#080808]",
  btnIconProcurement: "text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-500",
  btnIconTelemetry: "text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-500",
  btnTitle: "font-light tracking-widest uppercase text-xs text-slate-900 dark:text-white",
  btnSubtitle: "text-[10px] text-slate-500 dark:text-white/40 tracking-wider mt-2"
};

const LandingPage = ({ scrollTo }) => {
  return (
    <div className={STYLE.container}>
      
      <div className={STYLE.badgeWrapper}>
        <span className={STYLE.badgeDot}></span>
        <span className={STYLE.badgeText}>Agave Mainnet Ready</span>
      </div>

      <h1 className={STYLE.heading}>
        <span>Nodex</span>
        <span className={STYLE.headingAccent}>Architecture Refined.</span>
      </h1>

      <p className={STYLE.paragraph}>
        A high-fidelity diagnostic suite engineered for node operators. Validate bare-metal hardware procurement, execute DDoS vector audits, and monitor real-time JSON-RPC telemetry.
      </p>

      <div className={STYLE.cardGrid}>
        <button onClick={() => scrollTo('advisor')} className={`${STYLE.btnBase} ${STYLE.btnGradientProcurement}`}>
          <div className={STYLE.btnGlowProcurement}></div>
          <div className={STYLE.btnInner}>
            <Server className={STYLE.btnIconProcurement} size={32} strokeWidth={1} />
            <div>
              <h3 className={STYLE.btnTitle}>Procurement</h3>
              <p className={STYLE.btnSubtitle}>Hardware Validation</p>
            </div>
          </div>
        </button>

        <button onClick={() => scrollTo('doctor')} className={`${STYLE.btnBase} ${STYLE.btnGradientTelemetry}`}>
          <div className={STYLE.btnGlowTelemetry}></div>
          <div className={STYLE.btnInner}>
            <Activity className={STYLE.btnIconTelemetry} size={32} strokeWidth={1} />
            <div>
              <h3 className={STYLE.btnTitle}>Telemetry</h3>
              <p className={STYLE.btnSubtitle}>Network Diagnostics</p>
            </div>
          </div>
        </button>
      </div>

    </div>
  );
};

export default LandingPage;