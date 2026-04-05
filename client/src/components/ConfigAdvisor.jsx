import React, { useState } from 'react';
import { Cpu, Database, HardDrive, AlertCircle, CheckCircle2 } from 'lucide-react';

const ConfigAdvisor = () => {
  const [specs, setSpecs] = useState({ cpuCores: '', ramGB: '', storageType: 'NVMe' });
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    const feedback = [];
    if (specs.cpuCores < 12) feedback.push("CPU cores below 12-core requirement.");
    if (specs.ramGB < 512) feedback.push("RAM below 512GB recommendation.");
    
    setResult({ isOptimised: feedback.length === 0, feedback });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <div>
          <label className="text-slate-400 mb-2 flex items-center gap-2"><Cpu size={16}/> CPU Cores</label>
          <input type="number" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg" onChange={e => setSpecs({...specs, cpuCores: e.target.value})} />
        </div>
        <div>
          <label className="text-slate-400 mb-2 flex items-center gap-2"><HardDrive size={16}/> Storage</label>
          <select className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg" onChange={e => setSpecs({...specs, storageType: e.target.value})}>
            <option value="NVMe">NVMe</option>
            <option value="SSD">SSD</option>
            <option value="HDD">HDD</option>
          </select>
        </div>
        <button type="submit" className="md:col-span-2 bg-indigo-600 py-3 rounded-lg font-bold">Analyze</button>
      </form>
    </div>
  );
};

export default ConfigAdvisor;