// export interface LogDate {
//   id?: string;
//   date: Date;
//   durationTrip: number;
//   meansOfTransport: MeansOfTransport;
//   routeTripFrom: string;
//   routeTripTo: string;
//   statusOfDay: StatusOfDay;
//   weekNumber: number;
// }

interface Day {
  id?: string;
  date: Date;
  weekNumber: number;
}

interface DayOff extends Day {
  statusOfDay: 'day off';
}

interface WorkingFromHome extends Day {
  statusOfDay: 'working from home';
}

interface WorkingAtTheOffice extends Day {
  durationTrip: number;
  meansOfTransport: MeansOfTransport;
  routeTripFrom: string;
  routeTripTo: string;
  statusOfDay: 'working at the office';
}

export type LogDate = DayOff | WorkingFromHome | WorkingAtTheOffice;

export type MeansOfTransport = 'car' | 'public transport' | '';

export type StatusOfDay =
  | 'day off'
  | 'working at the office'
  | 'working from home';
