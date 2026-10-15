import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Wifi, 
  Activity, 
  Zap, 
  Layers, 
  Sliders, 
  Maximize2, 
  ShieldCheck, 
  Volume2, 
  Crosshair,
  Compass
} from 'lucide-react';
import { DroneTarget } from '../types/defense';
import { tacticalAudio } from '../utils/audio';

interface SensorTelemetryProps {
  activeTarget: DroneTarget | null;
}

export const SensorTelemetry: React.FC<SensorTelemetryProps> = ({ activeTarget }) => {
  const [thermalMode, setThermalMode] = useState<'WHITE_HOT' | 'GREEN_PHOSPHOR' | 'COLOR_HEAT'>('GREEN_PHOSPHOR');
  const [rfWaveform, setRfWaveform] = useState<number[]>([]);

  // Simulated live fluctuating RF spectrum bars
  useEffect(() => {
    const updateSpectrum = () => {
      const bars = Array.from({ length: 24 }, (_, i) => {
        const base = Math.sin(i * 0.4 + Date.now() * 0.003) * 30 + 50;
        const noise = Math.random() * 20;
        return Math.min(100, Math.max(15, Math.floor(base + noise)));
      });
      setRfWaveform(bars);
    };

    updateSpectrum();
    const interval = setInterval(updateSpectrum, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Electro-Optical & FLIR Thermal Night-Vision Feed */}
      <div className="bg-[#0b130c]/90 border border-emerald-900/60 rounded-xl p-4 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <h3 className="font-military font-bold text-sm tracking-wider uppercase text-white">
                FLIR ELECTRO-OPTICAL SIGHT
              </h3>
            </div>
            {/* Mode selector */}
            <div className="flex items-center gap-1 bg-black/60 border border-emerald-900/50 rounded p-0.5 text-[10px] font-mono">
              <button
                onClick={() => {
                  tacticalAudio.playKeypadBeep(800);
                  setThermalMode('GREEN_PHOSPHOR');
                }}
                className={`px-1.5 py-0.5 rounded ${thermalMode === 'GREEN_PHOSPHOR' ? 'bg-emerald-600 text-black font-bold' : 'text-zinc-400'}`}
              >
                NVG
              </button>
              <button
                onClick={() => {
                  tacticalAudio.playKeypadBeep(850);
                  setThermalMode('WHITE_HOT');
                }}
                className={`px-1.5 py-0.5 rounded ${thermalMode === 'WHITE_HOT' ? 'bg-zinc-200 text-black font-bold' : 'text-zinc-400'}`}
              >
                W-HOT
              </button>
              <button
                onClick={() => {
                  tacticalAudio.playKeypadBeep(900);
                  setThermalMode('COLOR_HEAT');
                }}
                className={`px-1.5 py-0.5 rounded ${thermalMode === 'COLOR_HEAT' ? 'bg-amber-600 text-black font-bold' : 'text-zinc-400'}`}
              >
                IR-HEAT
              </button>
            </div>
          </div>

          {/* Camera Viewfinder Screen */}
          <div className={`relative aspect-video rounded-lg overflow-hidden border border-emerald-900/80 flex items-center justify-center ${
            thermalMode === 'GREEN_PHOSPHOR' ? 'bg-[#021808]' :
            thermalMode === 'WHITE_HOT' ? 'bg-[#18181b]' : 'bg-[#1a0808]'
          }`}>
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
            
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border border-emerald-400/30 rounded-full" />
              <div className="absolute w-36 h-[1px] bg-emerald-400/40" />
              <div className="absolute h-36 w-[1px] bg-emerald-400/40" />
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>

            {/* Target Bounding Box */}
            <div className={`relative z-10 border-2 rounded p-2 transition-all duration-300 ${
              thermalMode === 'GREEN_PHOSPHOR' ? 'border-emerald-400 text-emerald-300 bg-emerald-950/40' :
              thermalMode === 'WHITE_HOT' ? 'border-zinc-200 text-zinc-100 bg-zinc-800/40' :
              'border-amber-500 text-amber-300 bg-red-950/40'
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold">
                <Crosshair className="w-3.5 h-3.5 animate-spin" />
                <span>AI OPTICAL LOCK: 98.6%</span>
              </div>
              <div className="text-[11px] font-mono font-bold mt-1">
                {activeTarget ? activeTarget.type : 'TARGET IDENTIFIED'}
              </div>
              <div className="text-[9px] font-mono text-zinc-400">
                ZOOM: 12.5X | RANGE: {activeTarget ? activeTarget.distanceKm.toFixed(1) : '3.2'} KM
              </div>
            </div>

            {/* Corner Bracket Graphics */}
            <div className="absolute top-2 left-2 border-t-2 border-l-2 border-emerald-500 w-4 h-4" />
            <div className="absolute top-2 right-2 border-t-2 border-r-2 border-emerald-500 w-4 h-4" />
            <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-emerald-500 w-4 h-4" />
            <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-emerald-500 w-4 h-4" />

            {/* Telemetry OSD */}
            <div className="absolute top-2 left-8 text-[9px] font-mono text-emerald-400/90 font-bold">
              REC ● 60 FPS | FLIR LWIR 640×512
            </div>
            <div className="absolute bottom-2 right-3 text-[9px] font-mono text-emerald-400/90 font-bold">
              AZ: {activeTarget?.azimuthDeg || 142}° | EL: +18°
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>SENSOR: Cooled InSb MWIR</span>
          <span className="text-emerald-400 font-bold">AUTO-TRACK ENGAGED</span>
        </div>
      </div>

      {/* 2. RF Spectrum & Frequency Fingerprint Analyzer */}
      <div className="bg-[#0b130c]/90 border border-emerald-900/60 rounded-xl p-4 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-3">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <h3 className="font-military font-bold text-sm tracking-wider uppercase text-white">
                RF SPECTRUM DIRECTION FINDER
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              HOPPING DETECTED
            </span>
          </div>

          {/* Spectrum Bar Visualizer */}
          <div className="bg-black/70 border border-emerald-900/50 rounded-lg p-3">
            <div className="flex items-end justify-between h-28 gap-1 pt-2">
              {rfWaveform.map((val, idx) => {
                const isDroneBand = idx >= 10 && idx <= 16;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className={`w-full rounded-t transition-all duration-200 ${
                        isDroneBand
                          ? 'bg-gradient-to-t from-red-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                          : 'bg-gradient-to-t from-emerald-900 to-emerald-500'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Frequency Bands Markers */}
            <div className="flex justify-between text-[9px] font-mono text-zinc-400 border-t border-emerald-900/60 pt-2 mt-1">
              <span>433 MHz</span>
              <span>868 MHz</span>
              <span className="text-amber-400 font-bold">2.4 GHz ISM</span>
              <span className="text-red-400 font-bold">5.8 GHz FPV</span>
              <span>GNSS L1</span>
            </div>
          </div>
        </div>

        {/* RF Analysis Output */}
        <div className="mt-3 bg-black/40 border border-emerald-900/40 rounded p-2.5 text-xs font-mono space-y-1">
          <div className="flex justify-between">
            <span className="text-zinc-500">PROTOCOL DETECTED:</span>
            <span className="text-amber-300 font-bold">ExpressLRS / OcuSync 3.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">FREQUENCY HOP RATE:</span>
            <span className="text-emerald-400 font-bold">250 Hops/sec</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">BEARING ACCURACY:</span>
            <span className="text-emerald-400 font-bold">±1.2° Azimuth</span>
          </div>
        </div>
      </div>

      {/* 3. Acoustic & Multi-Layer Air Defense Countermeasures */}
      <div className="bg-[#0b130c]/90 border border-emerald-900/60 rounded-xl p-4 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="font-military font-bold text-sm tracking-wider uppercase text-white">
                ACOUSTIC SENSOR & DEFENSE MATRIX
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYNCHRONIZED
            </span>
          </div>

          {/* Acoustic Doppler Micro-Rotors FFT */}
          <div className="bg-black/70 border border-emerald-900/50 rounded-lg p-3 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                BLADE PASSAGE FREQ (BPF):
              </span>
              <span className="text-emerald-300 font-bold">4,820 RPM (4-Blade)</span>
            </div>
            <div className="w-full bg-emerald-950/40 rounded-full h-2 overflow-hidden border border-emerald-900/60">
              <div className="bg-emerald-400 h-full w-[84%] animate-pulse" />
            </div>

            <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
              <span>ACOUSTIC RANGE: 1.5 KM</span>
              <span className="text-emerald-400">MICRO-PROPELLER HARMONIC MATCH</span>
            </div>
          </div>
        </div>

        {/* Countermeasures Systems Status */}
        <div className="mt-3 space-y-2">
          <div className="text-[10px] font-military font-bold text-zinc-400 uppercase tracking-wider">
            COUNTERMEASURES OPERATIONAL READINESS
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-black/50 border border-emerald-900/40 rounded p-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 leading-tight">DIR. RF JAMMER</div>
                <div className="text-emerald-400 font-bold text-[11px]">STANDBY 100W</div>
              </div>
            </div>

            <div className="bg-black/50 border border-emerald-900/40 rounded p-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 leading-tight">NAV GPS SPOOFER</div>
                <div className="text-emerald-400 font-bold text-[11px]">READY (LOC-GRID)</div>
              </div>
            </div>

            <div className="bg-black/50 border border-emerald-900/40 rounded p-2 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 leading-tight">LASER DAZZLER</div>
                <div className="text-emerald-400 font-bold text-[11px]">ARMED</div>
              </div>
            </div>

            <div className="bg-black/50 border border-emerald-900/40 rounded p-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 leading-tight">NET INTERCEPTOR</div>
                <div className="text-emerald-400 font-bold text-[11px]">LOADED (4 CANISTERS)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
