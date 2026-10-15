import React from 'react';
import { IndianArmyLogo } from './IndianArmyLogo';
import { Shield, Lock, Terminal, ExternalLink, Code2 } from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

interface FooterProps {
  onScrollToGitGrid: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToGitGrid, onScrollToTop }) => {
  return (
    <footer className="bg-[#050905] border-t border-emerald-950/80 pt-10 pb-8 px-4 lg:px-8 relative overflow-hidden">
      {/* Indian National Tricolor Stripe Accent at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-[#FFFFFF]" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <IndianArmyLogo size="sm" showSubtitle={true} />
          <p className="mt-3 text-xs font-mono text-zinc-400 max-w-md">
            PROJECT GARUDA-RR // AUTOMATED AIRSPACE SURVEILLANCE & DRONE INTERCEPTION COMMAND.
            DEVELOPED FOR BORDER OUTPOSTS & COUNTER-INSURGENCY MISSIONS.
          </p>
        </div>

        {/* Quick Access Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => {
              tacticalAudio.playKeypadBeep(700);
              onScrollToGitGrid();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-military font-bold tracking-wider transition-all"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>NUMERIC GIT GRID (KEYPAD)</span>
          </button>

          <button
            onClick={() => {
              tacticalAudio.playKeypadBeep(600);
              onScrollToTop();
            }}
            className="px-3 py-2 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/40 font-military font-bold tracking-wider transition-all"
          >
            TOP OF COMMAND ↑
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>सत्यमेव जयते • भारतीय सेना • RASHTRIYA RIFLES</span>
        </div>
        <div>
          <span>TACTICAL CIPHER NUMERIC GRID SYSTEM // OPEN ACCESS TO REPOSITORY</span>
        </div>
      </div>
    </footer>
  );
};
