import React, { useState } from 'react';
import { IncidentLog } from '../types/defense';
import { Shield, AlertTriangle, CheckCircle, FileText, Download, Filter } from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

interface TacticalLogsProps {
  logs: IncidentLog[];
  onAddLog: (log: Omit<IncidentLog, 'id' | 'timestamp'>) => void;
}

export const TacticalLogs: React.FC<TacticalLogsProps> = ({ logs }) => {
  const [filterSector, setFilterSector] = useState<string>('ALL');

  const filteredLogs = filterSector === 'ALL' 
    ? logs 
    : logs.filter((l) => l.sector.toLowerCase().includes(filterSector.toLowerCase()));

  const exportLogsAsText = () => {
    tacticalAudio.playKeypadBeep(950);
    const textContent = [
      '==============================================================',
      'INDIAN ARMY | RASHTRIYA RIFLES - COUNTER-DRONE MISSION LOGS',
      'PROJECT GARUDA // AUTOMATIC DRONE DETECTION REPORT',
      `EXPORTED: ${new Date().toISOString()} IST`,
      '==============================================================',
      '',
      ...logs.map((l) => `[${l.timestamp}] [${l.outcome}] SECTOR: ${l.sector} | TARGET: ${l.droneType} | ACTION: ${l.actionTaken}`),
    ].join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RR_DRONE_DETECTION_LOG_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-[#0b130c]/90 border border-emerald-900/60 rounded-xl p-4 lg:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-900/40 gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="font-military font-bold text-base tracking-wider uppercase text-white">
              BORDER SECTOR INTRUSION & INTERCEPTION AUDIT LOG
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Live automated telemetry record & countermeasure verification
            </p>
          </div>
        </div>

        {/* Filter & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/60 border border-emerald-900/50 rounded px-2 py-1 text-xs font-mono text-zinc-300">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={filterSector}
              onChange={(e) => {
                tacticalAudio.playKeypadBeep(700);
                setFilterSector(e.target.value);
              }}
              className="bg-transparent text-emerald-300 outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-zinc-900">ALL SECTORS</option>
              <option value="POONCH" className="bg-zinc-900">POONCH</option>
              <option value="URI" className="bg-zinc-900">URI</option>
              <option value="KUPWARA" className="bg-zinc-900">KUPWARA</option>
              <option value="RAJOURI" className="bg-zinc-900">RAJOURI</option>
              <option value="AKHNOOR" className="bg-zinc-900">AKHNOOR</option>
            </select>
          </div>

          <button
            onClick={exportLogsAsText}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 text-emerald-300 text-xs font-military font-bold tracking-wider transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT AUDIT</span>
          </button>
        </div>
      </div>

      {/* Log Entries Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-emerald-900/60 text-zinc-400 uppercase text-[10px] tracking-wider">
              <th className="py-2 px-3">TIMESTAMP</th>
              <th className="py-2 px-3">SECTOR</th>
              <th className="py-2 px-3">DRONE PROFILE</th>
              <th className="py-2 px-3">ACTION TAKEN</th>
              <th className="py-2 px-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-emerald-950/20 transition-colors">
                <td className="py-2.5 px-3 text-zinc-400 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-2.5 px-3 font-bold text-amber-300 whitespace-nowrap">{log.sector}</td>
                <td className="py-2.5 px-3 text-zinc-200">{log.droneType}</td>
                <td className="py-2.5 px-3 text-emerald-300">{log.actionTaken}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                    log.outcome === 'SUCCESS' ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' :
                    log.outcome === 'WARNING' ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' :
                    'bg-red-950/60 border-red-500/50 text-red-300'
                  }`}>
                    {log.outcome === 'SUCCESS' && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    {log.outcome === 'WARNING' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                    {log.outcome === 'ALERT' && <Shield className="w-3 h-3 text-red-400" />}
                    {log.outcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
