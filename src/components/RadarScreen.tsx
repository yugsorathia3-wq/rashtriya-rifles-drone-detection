import React, { useState } from 'react';
import { DroneTarget, ThreatLevel } from '../types/defense';
import { 
  Crosshair, 
  Radio, 
  ShieldAlert, 
  Zap, 
  Target, 
  AlertTriangle, 
  Maximize2, 
  Play, 
  RotateCcw,
  Navigation,
  CheckCircle,
  Eye
} from 'lucide-react';
import { tacticalAudio } from '../utils/audio';

interface RadarScreenProps {
  targets: DroneTarget[];
  selectedTargetId: string | null;
  onSelectTarget: (id: string) => void;
  onApplyCountermeasure: (targetId: string, actionType: 'JAM' | 'SPOOF' | 'INTERCEPT' | 'DISMISS') => void;
  onSimulateIntrusion: () => void;
  onResetTargets: () => void;
}

export const RadarScreen: React.FC<RadarScreenProps> = ({
  targets,
  selectedTargetId,
  onSelectTarget,
  onApplyCountermeasure,
  onSimulateIntrusion,
  onResetTargets,
}) => {
  const [rangeScaleKm, setRangeScaleKm] = useState<number>(8); // 8km max range
  const selectedTarget = targets.find((t) => t.id === selectedTargetId) || targets[0];

  const getThreatColor = (level: ThreatLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/80 border-red-500';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/80 border-amber-500';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/80 border-yellow-500';
      case 'LOW':
        return 'text-blue-400 bg-blue-950/80 border-blue-500';
      case 'FRIENDLY':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-500';
    }
  };

  const getBlipColor = (level: ThreatLevel) => {
    switch (level) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#eab308';
      case 'LOW': return '#38bdf8';
      case 'FRIENDLY': return '#22c55e';
    }
  };

  return (
    <div className="bg-[#0b130c]/90 border border-emerald-900/60 rounded-xl p-4 lg:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-grid-tactical pointer-events-none opacity-40" />

      {/* Title & Controls Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-900/40 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-military font-bold text-white tracking-wider uppercase">
                360° TACTICAL AIRSPACE RADAR
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-500/30">
                ACTIVE PHASED ARRAY
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Coverage: Line of Control (LOC) / Counter-Infiltration Grid
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Range switcher */}
          <div className="flex items-center bg-black/50 border border-emerald-900/60 rounded p-1 text-xs font-mono">
            {[4, 8, 12].map((km) => (
              <button
                key={km}
                onClick={() => {
                  tacticalAudio.playKeypadBeep(900);
                  setRangeScaleKm(km);
                }}
                className={`px-2 py-1 rounded transition-colors ${
                  rangeScaleKm === km
                    ? 'bg-emerald-600 text-black font-bold'
                    : 'text-zinc-400 hover:text-emerald-300'
                }`}
              >
                {km} KM
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              tacticalAudio.playKeypadBeep(1100);
              onSimulateIntrusion();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/40 border border-red-500/50 hover:bg-red-900/40 text-red-300 text-xs font-military font-bold tracking-wider transition-colors shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            <Play className="w-3.5 h-3.5 fill-red-400" />
            <span>SIMULATE INTRUSION</span>
          </button>

          <button
            onClick={() => {
              tacticalAudio.playKeypadBeep(600);
              onResetTargets();
            }}
            title="Reset Targets"
            className="p-1.5 rounded bg-black/50 border border-emerald-900/50 text-zinc-400 hover:text-emerald-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Scope (Left) + Target Telemetry & Countermeasures (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-start">
        {/* Radar Scope Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-black/80 border border-emerald-900/60 rounded-xl p-4 relative overflow-hidden shadow-inner">
          {/* Status Overlay */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-emerald-400/80 mb-2">
            <span>AZ: 000° - 359° | ELEV: 0° - 65°</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              SWEEP FREQ: 30 RPM
            </span>
            <span>MAX RANGE: {rangeScaleKm} KM</span>
          </div>

          {/* SVG Radar Display */}
          <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
            >
              <defs>
                {/* Radial Gradient for Radar Background */}
                <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0d2813" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#081a0c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#030804" stopOpacity="0.95" />
                </radialGradient>

                {/* Sweep Cone Gradient */}
                <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Background Circle */}
              <circle cx="200" cy="200" r="190" fill="url(#radarBg)" stroke="#166534" strokeWidth="2" />
              
              {/* Range Rings */}
              {[45, 90, 135, 180].map((radius, idx) => (
                <g key={radius}>
                  <circle
                    cx="200"
                    cy="200"
                    r={radius}
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="1"
                    strokeDasharray={idx === 3 ? "none" : "3 3"}
                    opacity="0.6"
                  />
                  {/* Distance label */}
                  <text
                    x="204"
                    y={200 - radius + 11}
                    fill="#4ade80"
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.75"
                  >
                    {((radius / 180) * rangeScaleKm).toFixed(1)} km
                  </text>
                </g>
              ))}

              {/* Crosshair Axes */}
              <line x1="200" y1="10" x2="200" y2="390" stroke="#166534" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />
              <line x1="10" y1="200" x2="390" y2="200" stroke="#166534" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />

              {/* Diagonal 45° Lines */}
              <line x1="65" y1="65" x2="335" y2="335" stroke="#14532d" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
              <line x1="65" y1="335" x2="335" y2="65" stroke="#14532d" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />

              {/* Cardinal Markers */}
              <text x="200" y="24" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold" fontFamily="monospace">N (000°)</text>
              <text x="375" y="204" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold" fontFamily="monospace">E (090°)</text>
              <text x="200" y="386" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold" fontFamily="monospace">S (180°)</text>
              <text x="25" y="204" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold" fontFamily="monospace">W (270°)</text>

              {/* Sector Labels */}
              <text x="315" y="75" fill="#ca8a04" fontSize="8" fontFamily="'Chakra Petch', sans-serif" opacity="0.7">KUPWARA</text>
              <text x="315" y="325" fill="#ca8a04" fontSize="8" fontFamily="'Chakra Petch', sans-serif" opacity="0.7">URI SECTOR</text>
              <text x="85" y="325" fill="#ca8a04" fontSize="8" fontFamily="'Chakra Petch', sans-serif" opacity="0.7">POONCH</text>
              <text x="85" y="75" fill="#ca8a04" fontSize="8" fontFamily="'Chakra Petch', sans-serif" opacity="0.7">RAJOURI</text>

              {/* Rotating Sweep Line */}
              <g className="radar-sweep-animation origin-[200px_200px]">
                <line x1="200" y1="200" x2="200" y2="15" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" />
                {/* Sweep phosphor wedge */}
                <path
                  d="M 200 200 L 200 15 A 185 185 0 0 1 330 70 Z"
                  fill="url(#sweepGradient)"
                />
              </g>

              {/* Center Radar Base Station: Rashtriya Rifles Tactical Operating Post */}
              <circle cx="200" cy="200" r="6" fill="#eab308" stroke="#000" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="14" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="2 2" />
              <text x="200" y="222" textAnchor="middle" fill="#facc15" fontSize="8" fontFamily="monospace" fontWeight="bold">RR-HQ</text>

              {/* Target Blips */}
              {targets.map((target) => {
                // Calculate position relative to center
                // distance mapped to pixel radius (0 to 180px)
                const clampedDistance = Math.min(target.distanceKm, rangeScaleKm);
                const r = (clampedDistance / rangeScaleKm) * 175;
                // Azimuth: 0 is North (up), degrees clockwise
                const rad = ((target.azimuthDeg - 90) * Math.PI) / 180;
                const x = 200 + r * Math.cos(rad);
                const y = 200 + r * Math.sin(rad);

                const isSelected = target.id === selectedTargetId;
                const blipColor = getBlipColor(target.threatLevel);

                return (
                  <g
                    key={target.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => {
                      tacticalAudio.playKeypadBeep(1200);
                      onSelectTarget(target.id);
                    }}
                  >
                    {/* Pulsing ring for critical/high targets */}
                    {(target.threatLevel === 'CRITICAL' || isSelected) && (
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="none"
                        stroke={blipColor}
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Selection Reticle if selected */}
                    {isSelected && (
                      <g stroke="#ffffff" strokeWidth="1.2">
                        <circle cx={x} cy={y} r="10" fill="none" strokeDasharray="3 2" />
                        <line x1={x - 14} y1={y} x2={x - 8} y2={y} />
                        <line x1={x + 8} y1={y} x2={x + 14} y2={y} />
                        <line x1={x} y1={y - 14} x2={x} y2={y - 8} />
                        <line x1={x} y1={y + 8} x2={x} y2={y + 14} />
                      </g>
                    )}

                    {/* Blip Center Marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 5.5 : 4}
                      fill={blipColor}
                      stroke="#000"
                      strokeWidth="1"
                    />

                    {/* Target Callsign Label */}
                    <text
                      x={x + 8}
                      y={y + 3}
                      fill={blipColor}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {target.callsign}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom quick stats */}
          <div className="w-full mt-3 pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Hostile: {targets.filter(t => t.threatLevel === 'CRITICAL' || t.threatLevel === 'HIGH').length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> Unverified: {targets.filter(t => t.threatLevel === 'MEDIUM' || t.threatLevel === 'LOW').length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Friendly: {targets.filter(t => t.threatLevel === 'FRIENDLY').length}
            </span>
          </div>
        </div>

        {/* Selected Target Telemetry & Tactical Actions (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {selectedTarget ? (
            <div className="bg-black/60 border border-emerald-900/60 rounded-xl p-4 lg:p-5 flex flex-col gap-4">
              {/* Target Header */}
              <div className="flex items-start justify-between border-b border-emerald-900/40 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-military font-bold text-white tracking-wider">
                      {selectedTarget.callsign}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase font-mono ${getThreatColor(selectedTarget.threatLevel)}`}>
                      {selectedTarget.threatLevel} THREAT
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-300 mt-0.5">
                    {selectedTarget.type}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block font-mono">STATUS</span>
                  <span className={`text-xs font-bold font-mono ${
                    selectedTarget.status === 'JAMMED' ? 'text-amber-400' :
                    selectedTarget.status === 'INTERCEPTED' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedTarget.status}
                  </span>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">DISTANCE</span>
                  <span className="text-emerald-300 font-bold text-sm">{selectedTarget.distanceKm.toFixed(2)} KM</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">ALTITUDE</span>
                  <span className="text-emerald-300 font-bold text-sm">{selectedTarget.altitudeM} M (AGL)</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">AZIMUTH / BEARING</span>
                  <span className="text-emerald-300 font-bold text-sm">{selectedTarget.azimuthDeg}° TRUE</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">GROUND SPEED</span>
                  <span className="text-emerald-300 font-bold text-sm">{selectedTarget.speedKmh} KM/H</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">RF LINK FREQUENCY</span>
                  <span className="text-amber-400 font-bold text-sm">{selectedTarget.rfFrequency}</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/40 rounded p-2.5">
                  <span className="text-[10px] text-zinc-500 block uppercase">SIGNAL STRENGTH</span>
                  <span className="text-zinc-200 font-bold text-sm">{selectedTarget.rfSignalStrengthDbm} dBm</span>
                </div>
              </div>

              {/* Suspected Payload & Sector */}
              <div className="bg-red-950/20 border border-red-900/40 rounded p-2.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>SUSPECTED PAYLOAD / MISSION:</span>
                </div>
                <p className="text-zinc-300">{selectedTarget.payloadSuspected}</p>
                <div className="mt-2 pt-1.5 border-t border-red-950/50 flex justify-between text-[11px] text-zinc-400">
                  <span>LOC SECTOR: <strong className="text-amber-300">{selectedTarget.sector}</strong></span>
                  <span>DETECTED: <strong>{selectedTarget.timestamp}</strong></span>
                </div>
              </div>

              {/* Countermeasure Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] font-military font-bold text-zinc-400 uppercase tracking-wider">
                  TACTICAL COUNTERMEASURES
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      tacticalAudio.playJammerSound();
                      onApplyCountermeasure(selectedTarget.id, 'JAM');
                    }}
                    disabled={selectedTarget.status === 'JAMMED' || selectedTarget.status === 'INTERCEPTED'}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-military font-bold text-xs uppercase transition-all disabled:opacity-40"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>SOFT-KILL JAMMER</span>
                  </button>

                  <button
                    onClick={() => {
                      tacticalAudio.playJammerSound();
                      onApplyCountermeasure(selectedTarget.id, 'SPOOF');
                    }}
                    disabled={selectedTarget.status === 'JAMMED' || selectedTarget.status === 'INTERCEPTED'}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 font-military font-bold text-xs uppercase transition-all disabled:opacity-40"
                  >
                    <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                    <span>GPS ANTI-SPOOF</span>
                  </button>

                  <button
                    onClick={() => {
                      tacticalAudio.playThreatAlert();
                      onApplyCountermeasure(selectedTarget.id, 'INTERCEPT');
                    }}
                    disabled={selectedTarget.status === 'INTERCEPTED'}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-red-600/30 hover:bg-red-600/40 border border-red-500/70 text-red-200 font-military font-bold text-xs uppercase transition-all disabled:opacity-40"
                  >
                    <Target className="w-3.5 h-3.5 text-red-400" />
                    <span>KINETIC INTERCEPT</span>
                  </button>

                  <button
                    onClick={() => {
                      tacticalAudio.playKeypadBeep(700);
                      onApplyCountermeasure(selectedTarget.id, 'DISMISS');
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-military font-bold text-xs uppercase transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span>DISMISS / FALSE ALARM</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/60 border border-emerald-900/60 rounded-xl p-8 flex flex-col items-center justify-center text-center text-zinc-500 font-mono text-xs">
              <Crosshair className="w-10 h-10 text-emerald-800 mb-2 animate-spin" />
              <span>SELECT A RADAR BLIP TO INSPECT TELEMETRY</span>
            </div>
          )}

          {/* Quick Target List Switcher */}
          <div className="bg-black/40 border border-emerald-900/40 rounded-xl p-3">
            <span className="text-[10px] font-military font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              TRACKED AIR TARGETS ({targets.length})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {targets.map((tgt) => (
                <button
                  key={tgt.id}
                  onClick={() => {
                    tacticalAudio.playKeypadBeep(1100);
                    onSelectTarget(tgt.id);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded text-xs font-mono transition-colors text-left ${
                    tgt.id === selectedTargetId
                      ? 'bg-emerald-950/70 border border-emerald-500/60 text-white'
                      : 'bg-black/30 border border-emerald-900/30 text-zinc-400 hover:text-emerald-300 hover:bg-emerald-950/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getBlipColor(tgt.threatLevel) }} />
                    <span className="font-bold">{tgt.callsign}</span>
                    <span className="text-[10px] text-zinc-500 truncate max-w-[110px]">{tgt.type}</span>
                  </div>
                  <span className="text-[11px] text-emerald-400">{tgt.distanceKm.toFixed(1)} km</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
