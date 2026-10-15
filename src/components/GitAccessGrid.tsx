import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Unlock, 
  ExternalLink, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Hash, 
  Settings2,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

export const GitAccessGrid: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [targetGitUrl, setTargetGitUrl] = useState<string>('https://github.com');
  const [autoOpenEnabled, setAutoOpenEnabled] = useState<boolean>(true);
  const [lastOpenedTime, setLastOpenedTime] = useState<string | null>(null);
  const [accessHistory, setAccessHistory] = useState<Array<{ code: string; time: string; url: string }>>([
    { code: '1971', time: '10:42:15 IST', url: 'https://github.com' },
    { code: '1999', time: '11:15:30 IST', url: 'https://github.com/topics/drone-detection' },
  ]);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastTriggeredCodeRef = useRef<string>('');

  // Function to execute opening Git
  const launchGit = (codeToOpen: string = inputCode) => {
    if (!codeToOpen.trim()) {
      tacticalAudio.playKeypadBeep(350);
      return;
    }

    setIsAuthorizing(true);
    tacticalAudio.playUnlockSuccess();
    
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
    setLastOpenedTime(nowTime);

    setAccessHistory((prev) => [
      { code: codeToOpen, time: nowTime, url: targetGitUrl },
      ...prev.slice(0, 4),
    ]);

    setSuccessMessage(`ACCESS AUTHORIZED [CODE: ${codeToOpen}] - OPENING GIT...`);

    // Open target Git in new window
    try {
      window.open(targetGitUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked, fallback available on button', e);
    }

    setTimeout(() => {
      setIsAuthorizing(false);
    }, 1800);
  };

  // Trigger when typing numbers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Allow digits, dashes, dots
    const cleaned = rawVal.replace(/[^\d]/g, '');
    setInputCode(cleaned);
    tacticalAudio.playKeypadBeep(700 + cleaned.length * 50);

    // If auto-open is enabled and user typed a number
    if (autoOpenEnabled && cleaned.length > 0 && cleaned !== lastTriggeredCodeRef.current) {
      // Small debounce so if typing multi-digits, it waits 700ms or triggers
      lastTriggeredCodeRef.current = cleaned;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        launchGit(cleaned);
      }, 600);
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleKeypadPress = (val: string) => {
    if (val === 'CLEAR') {
      tacticalAudio.playKeypadBeep(400);
      setInputCode('');
      setSuccessMessage(null);
      return;
    }

    if (val === 'ENTER') {
      launchGit();
      return;
    }

    // Number pressed
    const nextCode = inputCode + val;
    setInputCode(nextCode);
    tacticalAudio.playKeypadBeep(850 + parseInt(val, 10) * 35);

    if (autoOpenEnabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        launchGit(nextCode);
      }, 500);
    }
  };

  // Preset tactical codes
  const quickPresets = [
    { label: '1947', desc: 'Independence' },
    { label: '1971', desc: 'Vijay Divas' },
    { label: '1999', desc: 'Op Vijay Kargil' },
    { label: '2026', desc: 'Op Garuda Active' },
    { label: '786', desc: 'Sector Code' },
  ];

  return (
    <section 
      id="git-access-grid-section" 
      className="bg-[#081009] border-2 border-emerald-600/80 rounded-2xl p-6 lg:p-8 shadow-[0_0_50px_rgba(34,197,94,0.15)] relative overflow-hidden"
    >
      {/* Background Military Grid Accent */}
      <div className="absolute inset-0 bg-grid-tactical opacity-60 pointer-events-none" />

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 pointer-events-none" />

      {/* Header of the Grid Box */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-emerald-900/60 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
              DEFENCE REPOSITORY PORTAL
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              ONLINE
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-military font-bold text-white tracking-wider uppercase mt-1 flex items-center gap-2">
            <Hash className="w-7 h-7 text-emerald-400" />
            <span>TACTICAL NUMERIC CIPHER GRID</span>
            <span className="text-zinc-500 text-lg">/ Git Gateway</span>
          </h2>
          <p className="text-xs font-mono text-zinc-300 mt-0.5">
            जब भी आप इस ग्रिड बॉक्स में कोई भी नंबर लिखेंगे, Git स्वतः खुल जाएगा • Type ANY number to instantly open Git
          </p>
        </div>

        {/* Git Destination URL Selector */}
        <div className="bg-black/80 border border-emerald-900/80 rounded-xl p-3 flex flex-col gap-2 min-w-[280px]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
              <Settings2 className="w-3.5 h-3.5 text-amber-400" />
              TARGET GIT URL:
            </span>
            <span className="text-emerald-400 text-[10px]">CONFIGURABLE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={targetGitUrl}
              onChange={(e) => setTargetGitUrl(e.target.value)}
              placeholder="https://github.com..."
              className="bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs font-mono rounded px-2.5 py-1.5 w-full outline-none focus:border-emerald-400"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <button
              type="button"
              onClick={() => {
                tacticalAudio.playKeypadBeep(700);
                setTargetGitUrl('https://github.com');
              }}
              className="text-amber-400 hover:underline"
            >
              GitHub.com
            </button>
            <button
              type="button"
              onClick={() => {
                tacticalAudio.playKeypadBeep(750);
                setTargetGitUrl('https://github.com/topics/drone-detection');
              }}
              className="text-emerald-400 hover:underline"
            >
              Drone Detection Repos
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Interactive Body */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        {/* Left: Input Box & Digital HUD Readout (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Main Number Input Box */}
          <div className="bg-black/90 border-2 border-emerald-500/70 rounded-xl p-5 shadow-[inset_0_0_20px_rgba(34,197,94,0.2)]">
            <label className="block text-xs font-military font-bold text-emerald-400 tracking-wider uppercase mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                ENTER ANY NUMBERS HERE (कीबोर्ड से नंबर लिखें):
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">AUTO-TRIGGER ACTIVE</span>
            </label>

            {/* Glowing Digital Text Input */}
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputCode}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    launchGit();
                  }
                }}
                placeholder="उदा. 1971, 1234, 786..."
                className="w-full bg-[#051107] border-2 border-emerald-400/80 rounded-lg px-4 py-3.5 text-2xl lg:text-3xl font-mono font-bold tracking-widest text-emerald-300 placeholder:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-inner"
              />
              {inputCode && (
                <button
                  type="button"
                  onClick={() => {
                    tacticalAudio.playKeypadBeep(400);
                    setInputCode('');
                  }}
                  className="absolute right-3 px-2 py-1 bg-zinc-800 text-zinc-300 hover:text-white rounded text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Auto Launch Toggle */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-emerald-950/80 text-xs font-mono text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoOpenEnabled}
                  onChange={(e) => {
                    tacticalAudio.playKeypadBeep(600);
                    setAutoOpenEnabled(e.target.checked);
                  }}
                  className="w-4 h-4 rounded text-emerald-600 bg-zinc-900 border-zinc-700 accent-emerald-500"
                />
                <span className="text-zinc-200">
                  नंबर लिखते ही Git खोलें (Auto-launch on typing)
                </span>
              </label>

              <span className="text-amber-400 font-bold">
                {autoOpenEnabled ? 'ENABLED' : 'MANUAL'}
              </span>
            </div>
          </div>

          {/* Quick Preset Military Codes */}
          <div className="bg-black/60 border border-emerald-900/60 rounded-xl p-4">
            <span className="text-xs font-military font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              QUICK MILITARY NUMBER PRESETS (क्लिक करें और Git खोलें):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setInputCode(preset.label);
                    launchGit(preset.label);
                  }}
                  className="p-2 rounded bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 hover:border-emerald-500 text-left transition-all group"
                >
                  <div className="text-base font-mono font-bold text-amber-300 group-hover:text-amber-200">
                    {preset.label}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 truncate">
                    {preset.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Authorization Feedback Banner */}
          {successMessage && (
            <div className="bg-emerald-950/80 border-2 border-emerald-400 rounded-xl p-4 flex items-center justify-between animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-military font-bold text-white tracking-wider">
                    {successMessage}
                  </div>
                  <div className="text-xs font-mono text-emerald-300">
                    Destination: {targetGitUrl}
                  </div>
                </div>
              </div>
              <a
                href={targetGitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-emerald-500 text-black font-military font-bold text-xs uppercase flex items-center gap-1 hover:bg-emerald-400 shrink-0"
              >
                <span>VISIT GIT NOW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Right: Interactive 3x4 Tactical Grid Keypad (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-black/80 border border-emerald-900/80 rounded-xl p-5 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-military font-bold text-sm tracking-wider uppercase text-white">
                TACTICAL KEYPAD MATRIX (3×4 GRID)
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              PIN / DIGIT ACCESS
            </span>
          </div>

          {/* Keypad Buttons Grid */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'ENTER'].map((key) => {
              const isEnter = key === 'ENTER';
              const isClear = key === 'CLEAR';

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeypadPress(key)}
                  className={`py-4 rounded-lg font-mono font-bold transition-all transform active:scale-95 shadow-md flex flex-col items-center justify-center ${
                    isEnter
                      ? 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-black border-2 border-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] text-base'
                      : isClear
                      ? 'bg-red-950/50 hover:bg-red-900/60 border border-red-700/60 text-red-300 text-sm'
                      : 'bg-[#101e12] hover:bg-[#1a331e] border border-emerald-800/70 hover:border-emerald-500 text-emerald-200 text-2xl font-bold'
                  }`}
                >
                  {isEnter ? (
                    <span className="flex items-center gap-1 font-military uppercase">
                      <span>OPEN GIT</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  ) : isClear ? (
                    <span>CLR</span>
                  ) : (
                    <span>{key}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Big Direct Launch Button - 100% Guaranteed to work */}
          <div className="mt-5 pt-4 border-t border-emerald-900/60">
            <a
              href={targetGitUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                tacticalAudio.playUnlockSuccess();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-emerald-500 text-black font-military font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_0_20px_rgba(234,179,8,0.3)] cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-black" />
              <span>LAUNCH GIT PORTAL NOW (सीधे GIT खोलें) ↗</span>
            </a>
          </div>

          {/* Access Audit Trail */}
          <div className="mt-4 bg-emerald-950/20 border border-emerald-950/80 rounded p-3 text-[11px] font-mono text-zinc-400">
            <div className="flex justify-between text-zinc-500 mb-1 font-bold text-[10px] uppercase">
              <span>RECENT CIPHER TRIGGERS:</span>
              <span>TIME / LOG</span>
            </div>
            <div className="space-y-1">
              {accessHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-zinc-300">
                  <span className="text-emerald-400 font-bold">
                    CODE [{item.code}] → GIT OPENED
                  </span>
                  <span className="text-[10px] text-zinc-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
