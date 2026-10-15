/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { RadarScreen } from './components/RadarScreen';
import { SensorTelemetry } from './components/SensorTelemetry';
import { TacticalLogs } from './components/TacticalLogs';
import { SystemSpecs } from './components/SystemSpecs';
import { GitAccessGrid } from './components/GitAccessGrid';
import { Footer } from './components/Footer';
import { DroneTarget, IncidentLog } from './types/defense';
import { tacticalAudio } from './utils/audio';

const INITIAL_TARGETS: DroneTarget[] = [
  {
    id: 'tgt-1',
    callsign: 'GHOST-01',
    type: 'Loitering Munition / Kamikaze',
    threatLevel: 'CRITICAL',
    distanceKm: 2.8,
    altitudeM: 280,
    azimuthDeg: 42,
    speedKmh: 145,
    rfFrequency: '5.825 GHz (Encrypted FPV)',
    rfSignalStrengthDbm: -52,
    payloadSuspected: '1.8 kg High Explosive (RDX/Shrapnel warhead)',
    sector: 'Poonch Sector (LOC Post 7)',
    status: 'TRACKING',
    timestamp: '05:22:10 IST',
  },
  {
    id: 'tgt-2',
    callsign: 'VULTURE-X',
    type: 'Commercial Heavy-Lift Hexacopter',
    threatLevel: 'HIGH',
    distanceKm: 4.4,
    altitudeM: 160,
    azimuthDeg: 128,
    speedKmh: 65,
    rfFrequency: '2.440 GHz (FHSS Hopping)',
    rfSignalStrengthDbm: -68,
    payloadSuspected: 'Smuggling Payload (Suspected Arms / Narcotics Drop)',
    sector: 'Rajouri Sector (Keri Post)',
    status: 'TRACKING',
    timestamp: '05:24:45 IST',
  },
  {
    id: 'tgt-3',
    callsign: 'FALCON-9',
    type: 'Fixed-Wing Recon UAV',
    threatLevel: 'HIGH',
    distanceKm: 6.2,
    altitudeM: 850,
    azimuthDeg: 295,
    speedKmh: 110,
    rfFrequency: '915 MHz (Crossfire Telemetry)',
    rfSignalStrengthDbm: -74,
    payloadSuspected: 'High-Resolution Optical Gimbal & Signal Intercept Sensor',
    sector: 'Uri Sector (Rampur Ridge)',
    status: 'TRACKING',
    timestamp: '05:19:30 IST',
  },
  {
    id: 'tgt-4',
    callsign: 'GARUDA-FRIENDLY',
    type: 'Friendly Surveillance Drone',
    threatLevel: 'FRIENDLY',
    distanceKm: 1.1,
    altitudeM: 95,
    azimuthDeg: 195,
    speedKmh: 42,
    rfFrequency: 'Military Encrypted UHF (Bharat-Net)',
    rfSignalStrengthDbm: -32,
    payloadSuspected: 'RR Victor Force Perimeter Thermal Patrol',
    sector: 'Baramulla Outpost',
    status: 'TRACKING',
    timestamp: '05:15:00 IST',
  },
  {
    id: 'tgt-5',
    callsign: 'BLIP-UNKNOWN',
    type: 'Bird / False Positive',
    threatLevel: 'LOW',
    distanceKm: 1.8,
    altitudeM: 120,
    azimuthDeg: 230,
    speedKmh: 28,
    rfFrequency: 'Zero RF Emission',
    rfSignalStrengthDbm: -95,
    payloadSuspected: 'Natural Avian Signature (High-Altitude Golden Eagle)',
    sector: 'Kupwara High Ridge',
    status: 'DISMISSED',
    timestamp: '05:10:12 IST',
  },
];

const INITIAL_LOGS: IncidentLog[] = [
  {
    id: 'log-1',
    timestamp: '05:25:30 IST',
    sector: 'Poonch Sector',
    droneType: 'Kamikaze Loitering Munition (GHOST-01)',
    actionTaken: 'AESA Phased Radar Locked; 5.8GHz Jammer Armed',
    outcome: 'ALERT',
  },
  {
    id: 'log-2',
    timestamp: '05:21:14 IST',
    sector: 'Rajouri Sector',
    droneType: 'Commercial Hexacopter (VULTURE-X)',
    actionTaken: 'FLIR MWIR Thermal Optical Track Acquired',
    outcome: 'WARNING',
  },
  {
    id: 'log-3',
    timestamp: '05:18:02 IST',
    sector: 'Uri Sector',
    droneType: 'Fixed-Wing Recon UAV (FALCON-9)',
    actionTaken: 'RF Spectrum Frequency Hopping Detected on 915 MHz',
    outcome: 'WARNING',
  },
  {
    id: 'log-4',
    timestamp: '05:08:44 IST',
    sector: 'Kupwara Sector',
    droneType: 'Hexacopter Intruding Border Line',
    actionTaken: 'Directed RF Jamming 100W Activated; Drone Safely Forced Down',
    outcome: 'SUCCESS',
  },
  {
    id: 'log-5',
    timestamp: '04:55:10 IST',
    sector: 'Akhnoor Sector',
    droneType: 'FPV Payload Delivery Drone',
    actionTaken: 'Kinetic High-Tensile Net Launcher Intercept Completed',
    outcome: 'SUCCESS',
  },
];

export default function App() {
  const [targets, setTargets] = useState<DroneTarget[]>(INITIAL_TARGETS);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>('tgt-1');
  const [logs, setLogs] = useState<IncidentLog[]>(INITIAL_LOGS);

  const radarSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRadar = () => {
    radarSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGitGrid = () => {
    const el = document.getElementById('git-access-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Countermeasure
  const handleApplyCountermeasure = (
    targetId: string,
    actionType: 'JAM' | 'SPOOF' | 'INTERCEPT' | 'DISMISS'
  ) => {
    setTargets((prev) =>
      prev.map((t) => {
        if (t.id !== targetId) return t;

        let newStatus: DroneTarget['status'] = t.status;
        let actionDesc = '';
        let outcome: IncidentLog['outcome'] = 'SUCCESS';

        if (actionType === 'JAM') {
          newStatus = 'JAMMED';
          actionDesc = `Directional 100W RF Jammer deployed on ${t.rfFrequency}. Pilot control severed.`;
          outcome = 'SUCCESS';
        } else if (actionType === 'SPOOF') {
          newStatus = 'JAMMED';
          actionDesc = `GNSS Spoof signal initiated. Drone forced to return or autoland at safe coordinates.`;
          outcome = 'SUCCESS';
        } else if (actionType === 'INTERCEPT') {
          newStatus = 'INTERCEPTED';
          actionDesc = `Pneumatic Kinetic Net Interceptor deployed. Hostile drone captured intact.`;
          outcome = 'SUCCESS';
        } else if (actionType === 'DISMISS') {
          newStatus = 'DISMISSED';
          actionDesc = `Target cleared as benign / false positive by RR tactical operator.`;
          outcome = 'WARNING';
        }

        // Add log entry
        const now = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
        setLogs((currentLogs) => [
          {
            id: `log-${Date.now()}`,
            timestamp: now,
            sector: t.sector,
            droneType: `${t.callsign} (${t.type})`,
            actionTaken: actionDesc,
            outcome,
          },
          ...currentLogs,
        ]);

        return { ...t, status: newStatus };
      })
    );
  };

  // Simulate new hostile intrusion
  const handleSimulateIntrusion = () => {
    tacticalAudio.playThreatAlert();
    const id = `tgt-${Date.now()}`;
    const randomAzimuth = Math.floor(Math.random() * 360);
    const randomDistance = +(Math.random() * 5 + 1.2).toFixed(2);
    const randomAlt = Math.floor(Math.random() * 400 + 80);
    const sectors = ['Poonch LOC Post', 'Uri Rampur Sector', 'Kupwara Tangdhar', 'Rajouri Keri', 'Akhnoor Border'];
    const chosenSector = sectors[Math.floor(Math.random() * sectors.length)];
    const callsign = `INTRUDER-${Math.floor(Math.random() * 899 + 100)}`;

    const newTarget: DroneTarget = {
      id,
      callsign,
      type: 'Loitering Munition / Kamikaze',
      threatLevel: 'CRITICAL',
      distanceKm: randomDistance,
      altitudeM: randomAlt,
      azimuthDeg: randomAzimuth,
      speedKmh: Math.floor(Math.random() * 80 + 70),
      rfFrequency: '5.880 GHz Digital Link',
      rfSignalStrengthDbm: -48,
      payloadSuspected: 'Suspected IED / Anti-Personnel Drone Munition',
      sector: chosenSector,
      status: 'TRACKING',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
    };

    setTargets((prev) => [newTarget, ...prev]);
    setSelectedTargetId(id);

    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: newTarget.timestamp,
        sector: chosenSector,
        droneType: `${callsign} (New Border Intrusion Detected)`,
        actionTaken: 'Automated 360° Phased Array Radar Alert triggered',
        outcome: 'ALERT',
      },
      ...prev,
    ]);
  };

  const handleResetTargets = () => {
    setTargets(INITIAL_TARGETS);
    setSelectedTargetId('tgt-1');
  };

  const criticalCount = targets.filter(
    (t) => t.threatLevel === 'CRITICAL' && t.status === 'TRACKING'
  ).length;

  const activeTarget = targets.find((t) => t.id === selectedTargetId) || null;

  return (
    <div className="min-h-screen bg-[#090d09] text-emerald-100 flex flex-col font-military selection:bg-emerald-600 selection:text-black">
      {/* 1. Military Header with Indian Army Logo & Clocks */}
      <Header
        onScrollToGitGrid={scrollToGitGrid}
        detectedCount={targets.length}
        criticalCount={criticalCount}
      />

      <main className="flex-1 flex flex-col gap-10">
        {/* 2. Hero Briefing Section */}
        <HeroOverview
          onScrollToRadar={scrollToRadar}
          onScrollToGitGrid={scrollToGitGrid}
        />

        <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
          {/* 3. 360° Tactical Airspace Radar */}
          <div ref={radarSectionRef}>
            <RadarScreen
              targets={targets}
              selectedTargetId={selectedTargetId}
              onSelectTarget={(id) => setSelectedTargetId(id)}
              onApplyCountermeasure={handleApplyCountermeasure}
              onSimulateIntrusion={handleSimulateIntrusion}
              onResetTargets={handleResetTargets}
            />
          </div>

          {/* 4. Multi-Sensor Telemetry (FLIR Thermal, RF Waterfall, Acoustic Doppler) */}
          <SensorTelemetry activeTarget={activeTarget} />

          {/* 5. Tactical Incident & Interception Audit Log */}
          <TacticalLogs logs={logs} onAddLog={() => {}} />

          {/* 6. System Architecture & Countermeasure Specs */}
          <SystemSpecs />

          {/* 7. THE SPECIAL REQUESTED FEATURE:
                 "usme last me ek grid box banal taki jab bhai mai usme koi numbers likhu toh git open hi Jay."
                 Tactical Numeric Cipher Grid Box for launching Git upon typing numbers */}
          <GitAccessGrid />
        </div>
      </main>

      {/* 8. Footer with Official Motto and National Colors */}
      <Footer onScrollToGitGrid={scrollToGitGrid} onScrollToTop={scrollToTop} />
    </div>
  );
}
