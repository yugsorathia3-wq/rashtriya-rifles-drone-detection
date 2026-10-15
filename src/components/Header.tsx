import React, { useState, useEffect } from 'react';
import { IndianArmyLogo } from './IndianArmyLogo';
import { Volume2, VolumeX, ShieldAlert, Radio, Activity, Code2, AlertCircle } from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

interface HeaderProps {
  onScrollToGitGrid: () => void;
  detectedCount: number;
  criticalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToGitGrid,
  detectedCount,
  criticalCount,
}) => {
  const [timeState, setTimeState] = useState({
    ist: '',
    utc: '',
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // IST is UTC+5:30
      const istString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const utcString = now.toTimeString().split(' ')[0] + 'Z';
      setTimeState({ ist: istString, utc: utcString });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    tacticalAudio.enabled = next;
    if (next) {
      tacticalAudio.playKeypadBeep(980);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f0a]/95 backdrop-blur-md border-b border-emerald-950/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Indian Army & Rashtriya Rifles Emblem */}
        <IndianArmyLogo size="md" />

        {/* Right: Operational Status, Military Clock & Action Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tactical Clock */}
          <div className="bg-black/60 border border-emerald-900/60 rounded px-3 py-1.5 flex items-center gap-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block leading-none">IST (LOC)</span>
              <span className="text-emerald-400 font-bold tracking-wider">{timeState.ist || '00:00:00'}</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block leading-none">ZULU (UTC)</span>
              <span className="text-zinc-300 font-medium tracking-wider">{timeState.utc || '00:00:00Z'}</span>
            </div>
          </div>

          {/* Airspace Threat Level Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-military font-bold tracking-wider ${
            criticalCount > 0 
              ? 'bg-red-950/50 border-red-500/80 text-red-300 animate-pulse'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          }`}>
            {criticalCount > 0 ? (
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>
              {criticalCount > 0 ? `ALERT: ${criticalCount} INTRUSION` : 'AIRSPACE SECURED'}
            </span>
            <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {detectedCount} TARGETS
            </span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Tactical Audio' : 'Enable Tactical Audio'}
            className="p-2 rounded border border-emerald-900/60 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 hover:text-emerald-100 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Quick Jump to Git Access Grid */}
          <button
            onClick={() => {
              tacticalAudio.playKeypadBeep(750);
              onScrollToGitGrid();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-amber-500/20 to-yellow-600/30 border border-amber-500/50 hover:border-amber-400 text-amber-300 text-xs font-military font-bold tracking-wider hover:bg-amber-500/30 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>GIT CIPHER GRID</span>
          </button>
        </div>
      </div>
    </header>
  );
};
