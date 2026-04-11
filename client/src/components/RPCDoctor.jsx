import React, { useState, useEffect, useRef } from 'react';
import { Activity, Server, StopCircle, PlayCircle, Download, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RPCDoctor = () => {
  const [rpcUrl, setRpcUrl] = useState('https://api.mainnet-beta.solana.com');
  const [currentResult, setCurrentResult] = useState(null);
  const [mainnetResult, setMainnetResult] = useState(null);
  const [latencyHistory, setLatencyHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [auditError, setAuditError] = useState(null);
  const [auditCooldown, setAuditCooldown] = useState(0);

  const rpcUrlRef = useRef(rpcUrl);
  useEffect(() => { rpcUrlRef.current = rpcUrl; }, [rpcUrl]);
  useEffect(() => { setLatencyHistory([]); setCurrentResult(null); setMainnetResult(null); setError(null); setAuditData(null); setAuditError(null); }, [rpcUrl]);

  const runDiagnostics = async () => {
    setError(null);
    try {
      const [customRes, mainnetRes] = await Promise.all([
        fetch('http://localhost:5000/api/rpc-doctor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rpcUrl: rpcUrlRef.current }) }),
        fetch('http://localhost:5000/api/rpc-doctor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rpcUrl: 'https://api.mainnet-beta.solana.com' }) })
      ]);
      const customData = await customRes.json(); const mainnetData = await mainnetRes.json();
      if (customRes.status === 429) throw new Error('Rate limit exceeded. Wait 60s.');
      if (!customRes.ok) throw new Error(customData.error);
      if (!mainnetRes.ok) throw new Error(mainnetData.error);

      setCurrentResult(customData); setMainnetResult(mainnetData);
      setLatencyHistory(prev => [...prev, { time: customData.timestamp, customPing: customData.latency, mainnetPing: mainnetData.latency }].slice(-15));
    } catch (err) { setError(err.message); setIsMonitoring(false); }
  };

  useEffect(() => {
    let interval;
    if (isMonitoring) { runDiagnostics(); interval = setInterval(runDiagnostics, 3000); }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const runSecurityAudit = async () => {
    if (auditCooldown > 0) return;
    setIsAuditing(true); setAuditError(null);
    try {
      const host = new URL(rpcUrlRef.current).hostname;
      const res = await fetch('http://localhost:5000/api/audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ targetIp: host }) });
      const data = await res.json();
      if (res.status === 429) throw new Error(data.error);
      if (!res.ok) throw new Error(data.error);

      setAuditData(data); setAuditCooldown(20);
      const timer = setInterval(() => { setAuditCooldown(p => { if (p <= 1) { clearInterval(timer); return 0; } return p - 1; }); }, 1000);
    } catch (err) { setAuditError(err.message); } finally { setIsAuditing(false); }
  };

  const exportCSV = () => {
    if (!latencyHistory.length) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([['Time,Custom_ms,Mainnet_ms', ...latencyHistory.map(r => `${r.time},${r.customPing},${r.mainnetPing}`)].join('\n')], { type: 'text/csv' }));
    link.download = `telemetry_${Date.now()}.csv`; link.click();
  };

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"><Activity className="text-cyan-400" size={24} strokeWidth={1} /></div>
          <div><h2 className="text-2xl font-extralight tracking-wide text-white">Network Telemetry</h2><p className="text-white/30 text-[11px] uppercase tracking-widest mt-1">Real-time latency & vector auditing</p></div>
        </div>
        {latencyHistory.length > 0 && <button onClick={exportCSV} className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] text-white/50 px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.2em] border border-white/10 transition-all"><Download size={12}/> Export</button>}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-1 relative group">
          <Server className="absolute left-5 top-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} strokeWidth={1.5} />
          <input type="url" value={rpcUrl} onChange={e => setRpcUrl(e.target.value)} disabled={isMonitoring} className="w-full pl-14 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white/90 font-light tracking-wide outline-none focus:border-cyan-500/50 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 backdrop-blur-md" />
        </div>
        <button onClick={() => setIsMonitoring(!isMonitoring)} className={`px-10 py-4 rounded-2xl font-light uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all duration-500 border ${isMonitoring ? 'bg-violet-500/10 text-violet-300 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'}`}>
          {isMonitoring ? <><StopCircle size={14}/> Halting</> : <><PlayCircle size={14}/> Initialize</>}
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400/80 font-light tracking-wide p-5 rounded-2xl mb-8 text-sm">{error}</div>}

      {currentResult && (
        <div className="space-y-8 animate-in fade-in duration-1000 slide-in-from-bottom-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ l: 'Status', v: currentResult.status, c: currentResult.status === 'Healthy' ? 'text-cyan-400' : 'text-violet-400' }, { l: 'Epoch', v: currentResult.epoch, c: 'text-white' }, { l: 'Version', v: currentResult.version, c: 'text-white/60 text-lg' }, { l: 'Slot', v: currentResult.slot, c: 'text-white' }].map((s, i) => (
              <div key={i} className="p-6 bg-white/[0.01] rounded-2xl border border-white/[0.05] backdrop-blur-md">
                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-2">{s.l}</p>
                <p className={`text-2xl font-extralight tracking-wide ${s.c}`}>{s.v}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.01] p-8 rounded-[2rem] border border-white/[0.05] h-80 relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} unit="ms" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 300, fontSize: '12px' }} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}/>
                <Line name="Custom Node" type="monotone" dataKey="customPing" stroke="#22d3ee" strokeWidth={1.5} dot={{ fill: '#22d3ee', r: 2 }} activeDot={{ r: 5, fill: '#fff', stroke: '#22d3ee', strokeWidth: 1.5 }} />
                <Line name="Mainnet Base" type="monotone" dataKey="mainnetPing" stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/[0.01] p-8 rounded-[2rem] border border-white/[0.05] mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-lg font-extralight tracking-wide text-white flex items-center gap-3"><Shield size={18} className="text-violet-400" strokeWidth={1.5}/> Port Vulnerability Audit</h3>
                <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase mt-2">DDoS Vector Penetration Test</p>
              </div>
              <button onClick={runSecurityAudit} disabled={isAuditing || auditCooldown > 0} className={`px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] font-light transition-all border ${auditCooldown > 0 ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed' : 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-500/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]'}`}>
                {isAuditing ? 'Scanning...' : auditCooldown > 0 ? `Cooldown ${auditCooldown}s` : 'Execute Scan'}
              </button>
            </div>

            {auditError && <div className="bg-red-500/10 border border-red-500/20 text-red-400/80 font-light p-4 rounded-xl mb-6 text-sm">{auditError}</div>}

            {auditData && (
              <div className="space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
                <div className="flex justify-between items-center p-6 bg-black/20 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    {auditData.score === 100 ? <ShieldCheck size={28} className="text-cyan-400" strokeWidth={1.5}/> : <ShieldAlert size={28} className="text-violet-400" strokeWidth={1.5}/>}
                    <span className="font-light tracking-[0.2em] uppercase text-[10px] text-white/50">Security Rating</span>
                  </div>
                  <span className={`text-4xl font-extralight ${auditData.score === 100 ? 'text-cyan-400' : 'text-violet-400'}`}>{auditData.score}<span className="text-xl text-white/20">/100</span></span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {auditData.ports.map((p) => (
                    <div key={p.port} className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-light tracking-widest text-white/80 text-sm">Port {p.port}</h4>
                        <span className={`px-3 py-1 text-[8px] uppercase tracking-[0.2em] rounded-full border ${p.status === 'OPEN' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>{p.status}</span>
                      </div>
                      <p className="text-[10px] text-white/30 tracking-widest uppercase font-light">{p.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RPCDoctor;