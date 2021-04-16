interface Day {
  id?: string;
  date: Date;
  weekNumber: number;
}

export interface DayOff extends Day {
  statusOfDay: 'day off';
}

export interface WorkingAtTheOffice extends Day {
  durationTrip: number;
  meansOfTransport: MeansOfTransport;
  routeTripFrom: string;
  routeTripTo: string;
  statusOfDay: 'working at the office';
}

export interface WorkingFromHome extends Day {
  durationTrip: 0;
  statusOfDay: 'working from home';
}

export type LogDate = DayOff | WorkingFromHome | WorkingAtTheOffice;

export type MeansOfTransport = 'car' | 'public transport';

export type StatusOfDay =
  | 'day off'
  | 'working at the office'
  | 'working from home';
