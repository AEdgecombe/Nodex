import React, { useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Cloud, Server, Download } from 'lucide-react';

const ConfigAdvisor = () => {
  const [formData, setFormData] = useState({ environment: 'bare-metal', cpuCores: 16, clockSpeed: 3.0, ram: 512, storageType: 'nvme', storageSize: 2 });
  const [report, setReport] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const generateReport = () => {
    setIsAnalysing(true);
    setTimeout(() => {
      const results = { score: 0, components: {} };
      if (formData.cpuCores >= 16 && formData.clockSpeed >= 2.8) {
        results.components.cpu = { status: 'Optimal', message: 'Sufficient for 400ms block production.' }; results.score += 35;
      } else { results.components.cpu = { status: 'Critical', message: 'Insufficient compute parameters.' }; }

      if (formData.ram >= 512) {
        results.components.ram = { status: 'Optimal', message: 'Accounts DB fits in memory.' }; results.score += 35;
      } else if (formData.ram >= 256) {
        results.components.ram = { status: 'Warning', message: 'OOM crash risk as voting validator.' }; results.score += 15;
      } else { results.components.ram = { status: 'Critical', message: 'Below absolute minimum.' }; }

      if (formData.storageType === 'nvme' && formData.storageSize >= 2) {
        if (formData.environment === 'cloud') {
          results.components.storage = { status: 'Warning', message: 'Cloud NVMe selected. Beware IOPS throttling.' }; results.score += 20;
        } else {
          results.components.storage = { status: 'Optimal', message: 'Local NVMe provides required IOPS.' }; results.score += 30;
        }
      } else { results.components.storage = { status: 'Critical', message: 'Insufficient storage type/size.' }; }

      setReport(results); setIsAnalysing(false);
    }, 1200); 
  };

  const generateCliScript = () => {
    let script = `#!/bin/bash\n# Agave Validator Startup Script\n\nexec agave-validator \\\n  --identity ~/validator-keypair.json \\\n  --known-validator 7Np41oeYqPefeNQEHSv1yXCrK... \\\n  --only-known-rpc \\\n  --rpc-port 8899 \\\n  --dynamic-port-range 8000-8020 \\\n`;
    if (formData.ram < 512) script += `  --limit-ledger-size 50000000 \\ # Crucial for < 512GB RAM\n`;
    script += formData.storageType !== 'nvme' ? `  --accounts /mnt/ramdisk \\\n` : `  --accounts /mnt/solana-accounts \\\n`;
    script += `  --log ~/solana-validator.log\n`;
    return script;
  };

  const exportJSON = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify({ timestamp: new Date().toISOString(), target: "Mainnet-Beta", requested_specs: formData, report }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `procurement_${Date.now()}.json`; link.click();
  };

  const inputClass = "w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white/90 font-light tracking-wide outline-none focus:border-violet-500/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all backdrop-blur-md appearance-none";
  const labelClass = "block text-[9px] text-white/40 uppercase tracking-[0.3em] mb-2 pl-1";

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"><Server className="text-violet-400" size={24} strokeWidth={1} /></div>
          <div><h2 className="text-2xl font-extralight tracking-wide text-white">Hardware Procurement</h2><p className="text-white/30 text-[11px] uppercase tracking-widest mt-1">Architecture validation & compilation</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-1 lg:col-span-4 bg-white/[0.01] p-8 rounded-[2rem] border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
          <div className="space-y-6">
            <div><label className={labelClass}>Environment</label><select className={inputClass} value={formData.environment} onChange={e => setFormData({...formData, environment: e.target.value})}><option value="bare-metal">Bare Metal</option><option value="cloud">Cloud VPS</option></select></div>
            <div><label className={labelClass}>CPU Cores</label><input type="number" className={inputClass} value={formData.cpuCores} onChange={e => setFormData({...formData, cpuCores: parseInt(e.target.value)})} /></div>
            <div><label className={labelClass}>Clock Speed (GHz)</label><input type="number" step="0.1" className={inputClass} value={formData.clockSpeed} onChange={e => setFormData({...formData, clockSpeed: parseFloat(e.target.value)})} /></div>
            <div><label className={labelClass}>Memory</label><select className={inputClass} value={formData.ram} onChange={e => setFormData({...formData, ram: parseInt(e.target.value)})}><option value="128">128 GB</option><option value="256">256 GB</option><option value="512">512 GB</option><option value="1024">1 TB</option></select></div>
            <div><label className={labelClass}>Storage</label><select className={inputClass} value={formData.storageType} onChange={e => setFormData({...formData, storageType: e.target.value})}><option value="nvme">NVMe PCIe Gen4</option><option value="ssd">SATA SSD</option><option value="hdd">HDD</option></select></div>
            
            <button onClick={generateReport} disabled={isAnalysing} className="w-full mt-4 bg-white/[0.03] hover:bg-white/[0.06] text-white font-light tracking-[0.2em] uppercase text-[10px] py-5 rounded-xl border border-white/10 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">{isAnalysing ? 'Compiling Profile...' : 'Analyze Architecture'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8">
          {!report ? (
            <div className="h-full flex flex-col items-center justify-center text-white/20 border border-white/[0.02] rounded-[2rem] p-8 bg-white/[0.01] min-h-[500px]">
              <Cpu size={48} strokeWidth={0.5} className="mb-6 opacity-30" />
              <p className="text-center font-extralight tracking-widest uppercase text-[10px]">Awaiting system parameters</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-1000 slide-in-from-right-8">
              <div className="flex justify-between items-center bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.05]">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-light text-white/50">Suitability Index</h3>
                <div className={`text-6xl font-extralight ${report.score >= 90 ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]' : report.score >= 60 ? 'text-violet-400' : 'text-red-400'}`}>{report.score}<span className="text-2xl text-white/20">/100</span></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{ icon: Cpu, layer: 'Compute', res: report.components.cpu }, { icon: MemoryStick, layer: 'Memory', res: report.components.ram }, { icon: formData.environment === 'cloud' ? Cloud : HardDrive, layer: 'Storage', res: report.components.storage }].map((item, i) => (
                  <div key={i} className="bg-white/[0.01] p-6 rounded-2xl border border-white/[0.05]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg border ${item.res.status === 'Optimal' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-violet-500/10 border-violet-500/20 text-violet-400'}`}><item.icon size={16} strokeWidth={1.5} /></div>
                      <h4 className="font-light tracking-widest uppercase text-[10px] text-white/70">{item.layer}</h4>
                    </div>
                    <p className="text-xs text-white/40 font-light leading-relaxed">{item.res.message}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#050505]/80 backdrop-blur-xl rounded-[2rem] border border-white/[0.05] overflow-hidden mt-8">
                <div className="bg-white/[0.02] px-6 py-4 flex justify-between items-center border-b border-white/[0.05]">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-light text-white/40">start-validator.sh</span>
                  <button onClick={() => navigator.clipboard.writeText(generateCliScript())} className="text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white px-4 py-2 border border-white/10 rounded-full hover:bg-white/[0.05] transition-all">Copy</button>
                </div>
                <div className="p-6 overflow-x-auto"><pre className="text-xs font-light tracking-wide text-cyan-300/60 leading-loose">{generateCliScript()}</pre></div>
              </div>

              <div className="flex justify-end pt-4">
                <button onClick={exportJSON} className="flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] text-white/50 hover:text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] border border-white/10 transition-all">
                  <Download size={12} /> Export JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ConfigAdvisor;