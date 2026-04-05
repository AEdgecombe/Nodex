import React, { useState } from 'react';
import { Activity, Search, Server } from 'lucide-react';

const RPCDoctor = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null);

  const checkNode = async () => {
    setStatus({ loading: true });
    // This will eventually call your /api/diagnose endpoint
    setTimeout(() => {
      setStatus({ loading: false, slot: 254120394, latency: '42ms', health: 'Healthy' });
    }, 1500);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
      <div className="flex gap-4 mb-8">
        <input type="text" placeholder="https://api.mainnet-beta.solana.com" 
          className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg"
          onChange={e => setUrl(e.target.value)} />
        <button onClick={checkNode} className="bg-cyan-600 px-6 rounded-lg font-bold hover:bg-cyan-500 transition-all flex items-center gap-2">
          <Search size={18}/> Diagnose
        </button>
      </div>

      {status?.slot && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-black">Current Slot</p>
            <p className="text-xl font-mono text-cyan-400">{status.slot}</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-black">Latency</p>
            <p className="text-xl font-mono text-emerald-400">{status.latency}</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-black">Sync Status</p>
            <p className="text-xl font-bold text-white">{status.health}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RPCDoctor;