export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'FRIENDLY';

export type DroneType = 
  | 'Micro Quadcopter'
  | 'Fixed-Wing Recon UAV'
  | 'Commercial Heavy-Lift Hexacopter'
  | 'Loitering Munition / Kamikaze'
  | 'FPV High-Speed Interceptor'
  | 'Friendly Surveillance Drone'
  | 'Bird / False Positive';

export interface DroneTarget {
  id: string;
  callsign: string;
  type: DroneType;
  threatLevel: ThreatLevel;
  distanceKm: number; // 0.1 to 8.0 km
  altitudeM: number;
  azimuthDeg: number; // 0 to 359
  speedKmh: number;
  rfFrequency: string; // e.g. "2.445 GHz"
  rfSignalStrengthDbm: number; // e.g. -45 dBm
  payloadSuspected: string;
  sector: string;
  status: 'TRACKING' | 'LOCKED' | 'JAMMED' | 'INTERCEPTED' | 'DISMISSED';
  timestamp: string;
}

export interface IncidentLog {
  id: string;
  timestamp: string;
  sector: string;
  droneType: string;
  actionTaken: string;
  outcome: 'SUCCESS' | 'WARNING' | 'ALERT';
}
