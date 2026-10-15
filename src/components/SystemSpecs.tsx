import React from 'react';
import { Shield, Cpu, Radar, Crosshair, Zap, Wifi, Layers, CheckCircle } from 'lucide-react';

export const SystemSpecs: React.FC = () => {
  const specs = [
    {
      icon: <Radar className="w-5 h-5 text-emerald-400" />,
      title: '360° Active Phased Array Radar',
      metric: '0.1 - 8.0 KM',
      subtitle: 'Micro-UAV & Swarm Detection',
      desc: 'Solid-state S/X band phased array radar with zero mechanical rotating parts. Scans 360° azimuth and 0-65° elevation continuously.',
    },
    {
      icon: <Wifi className="w-5 h-5 text-amber-400" />,
      title: 'RF Direction Finding & Decryption',
      metric: '433 MHz - 5.8 GHz',
      subtitle: 'Drone Control & Video Link Intercept',
      desc: 'Direction-finding antenna array with automated frequency hopping classification for DJI OcuSync, ExpressLRS, TBS Crossfire, and analog FPV video downlinks.',
    },
    {
      icon: <Crosshair className="w-5 h-5 text-cyan-400" />,
      title: 'Electro-Optical & FLIR Thermal Sight',
      metric: '640×512 Cooled MWIR',
      subtitle: 'Continuous 30x Optical Zoom',
      desc: 'Daylight HD camera coupled with cooled mid-wave infrared thermal sensor with onboard AI bounding box tracking for night and foggy weather operations.',
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: 'Multi-Band Soft-Kill Jamming',
      metric: '100W Directional EIRP',
      subtitle: 'Autonomous RF & GNSS Interruption',
      desc: 'Instantly breaks pilot control link, triggers automated fail-safe return-to-home or forces drone to touch down safely without payload detonation.',
    },
    {
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      title: 'Kinetic & Net Gun Hard-Kill',
      metric: 'Pneumatic 120m/s',
      subtitle: 'Physical Capture of Hostile Payload',
      desc: 'Fires high-tensile Kevlar netting to physically capture the drone and retrieve forensic telemetry, micro-SD cards, and explosive components intact.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
      title: 'Edge AI Swarm Neural Classifier',
      metric: '< 1.8 Sec Latency',
      subtitle: 'Automated Threat Triage & Slew-to-Cue',
      desc: 'Onboard neural network classifies bird vs fixed-wing vs micro-rotor drone in real-time, eliminating false alarms and cueing automated countermeasures.',
    },
  ];

  return (
    <section className="bg-[#090f0a] border-t border-b border-emerald-950/80 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-2.5 py-1 rounded text-xs font-military font-bold tracking-widest bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 uppercase">
            DEFENCE SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-military font-bold text-white tracking-wider uppercase mt-2">
            PROJECT GARUDA MULTI-LAYER TECHNICAL SPECIFICATIONS
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Engineered for high-altitude mountainous terrains, Line of Control anti-smuggling, and counter-terror airborne threat deterrence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className="bg-[#0c160e]/80 border border-emerald-900/50 hover:border-emerald-600/70 rounded-xl p-5 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-900/60 group-hover:border-emerald-500/50 transition-colors">
                  {spec.icon}
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-400">{spec.metric}</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{spec.subtitle}</div>
                </div>
              </div>

              <h3 className="text-base font-military font-bold text-white tracking-wide mt-4 group-hover:text-emerald-300 transition-colors">
                {spec.title}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-2 leading-relaxed">
                {spec.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-emerald-950/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>FIELD VALIDATED: J&K SECTORS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
