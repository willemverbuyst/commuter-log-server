export type LogDate = {
  id?: string;
  date: Date;
  durationTrip: number;
  meansOfTransport: MeansOfTransport;
  routeTripFrom: string;
  routeTripTo: string;
  statusOfDay: StatusOfDay;
  weekNumber: number;
};

export type MeansOfTransport = 'car' | 'public transport' | '';

export type StatusOfDay =
  | 'day off'
  | 'working at the office'
  | 'working from home';
