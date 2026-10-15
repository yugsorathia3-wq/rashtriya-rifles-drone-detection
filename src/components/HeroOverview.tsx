import React from 'react';
import { IndianArmyLogo } from './IndianArmyLogo';
import { Shield, Radar, Zap, Radio, Target, AlertCircle, ArrowDown } from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

interface HeroOverviewProps {
  onScrollToRadar: () => void;
  onScrollToGitGrid: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  onScrollToRadar,
  onScrollToGitGrid,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a140c] via-[#081009] to-[#090d09] border-b border-emerald-950 py-10 lg:py-14 px-4 lg:px-8">
      {/* Background Camo & Radar Lines */}
      <div className="absolute inset-0 bg-grid-tactical opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Main Hero Briefing */}
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded text-xs font-military font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                DIRECTORATE GENERAL OF MILITARY OPERATIONS (DGMO)
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                CLASSIFICATION: RESTRICTED // LOC SURVEILLANCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-military font-bold text-white tracking-wide uppercase leading-tight">
              RASHTRIYA RIFLES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                AUTOMATIC DRONE DETECTION
              </span>{' '}
              & AIRSPACE DEFENCE
            </h1>

            {/* Hindi / Urdu Motto & Operational Purpose */}
            <div className="mt-3 flex items-center gap-3 text-sm font-military text-amber-300/90 tracking-wider">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-amber-500/30 font-bold">
                राष्ट्रीय राइफल्स: दृढ़ता और वीरता
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300 font-mono text-xs">
                PROJECT GARUDA // AUTONOMOUS COUNTER-UAS SHIELD
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-zinc-300 font-mono leading-relaxed">
              Integrated multi-sensor counter-drone air defense grid deployed across sensitive border posts and counter-insurgency sectors. Featuring 360° Phased Array Radar, RF direction finding & frequency hop fingerprinting (433MHz - 5.8GHz), FLIR thermal night-vision tracking, and autonomous soft-kill RF/GNSS jamming with kinetic net interception.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  tacticalAudio.playKeypadBeep(900);
                  onScrollToRadar();
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-black font-military font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
              >
                <Radar className="w-4 h-4" />
                <span>LAUNCH 360° RADAR SCOPE</span>
              </button>

              <button
                onClick={() => {
                  tacticalAudio.playKeypadBeep(800);
                  onScrollToGitGrid();
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-600/30 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-military font-bold text-sm tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              >
                <Target className="w-4 h-4 text-amber-400" />
                <span>SECURE GIT CIPHER GRID (निचला ग्रिड बॉक्स)</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Regimental Unit Cards & Sector Coverage */}
          <div className="w-full lg:w-auto shrink-0 bg-black/60 border border-emerald-900/60 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <span className="text-xs font-military font-bold text-zinc-400 uppercase tracking-wider">
                RR COUNTER-INFILTRATION FORCES
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">5 DIVISIONS ACTIVE</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-amber-300 font-bold">DELTA FORCE</span>
                <span className="text-zinc-400">Doda / Kishtwar Sector</span>
                <span className="text-emerald-400 text-[10px]">RADAR ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-amber-300 font-bold">ROMEO FORCE</span>
                <span className="text-zinc-400">Poonch / Rajouri Sector</span>
                <span className="text-emerald-400 text-[10px]">RADAR ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-amber-300 font-bold">VICTOR FORCE</span>
                <span className="text-zinc-400">Anantnag / Pulwama</span>
                <span className="text-emerald-400 text-[10px]">RADAR ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-amber-300 font-bold">KILO FORCE</span>
                <span className="text-zinc-400">Kupwara / Baramulla</span>
                <span className="text-emerald-400 text-[10px]">RADAR ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-amber-300 font-bold">UNIFORM FORCE</span>
                <span className="text-zinc-400">Udhampur / Reasi Sector</span>
                <span className="text-emerald-400 text-[10px]">RADAR ACTIVE</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>SYSTEM UPTIME: 99.98%</span>
              <span className="text-emerald-400 font-bold">LOC SENSOR NETWORK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
