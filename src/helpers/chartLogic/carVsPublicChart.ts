import type { LogDate } from '../../models/Logdata';
import { reduceDates } from '../utils';

// DOUGHNUT CHART, car vs public chart
// Display total travel times public transport vs total travel times car
export const getCarVsPublicTotalsData = (
  logData: LogDate[]
): {
  totalsCar: {
    numberOfDaystravelled: number;
    totalTimeTravelled: number;
  };
  totalsPublic: {
    numberOfDaystravelled: number;
    totalTimeTravelled: number;
  };
  labels: string[];
  title: string;
} => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);

  const totalsCar = getTotalsTransport(reducedDates, 'car');
  const totalsPublic = getTotalsTransport(reducedDates, 'public transport');
  const labels = ['car', 'public transport'];
  const title = 'TOTAL TIMES CAR VS PUBLIC TRANSPORT';

  return {
    totalsCar,
    totalsPublic,
    labels,
    title,
  };
};

// Get the total of all working days at the office for car or for public transport
const getTotalsTransport = (
  workingDays: LogDate[],
  transport: string
): {
  numberOfDaystravelled: number;
  totalTimeTravelled: number;
} => {
  const daysTravelled = workingDays.filter(
    (day) =>
      day.statusOfDay === 'working at the office' &&
      day.meansOfTransport === transport
  );
  const numberOfDaystravelled = daysTravelled.length;
  const totalTimeTravelled =
    daysTravelled.length > 0
      ? daysTravelled.map((day) => day.durationTrip).reduce((a, b) => a + b)
      : 0;

  return {
    numberOfDaystravelled,
    totalTimeTravelled,
  };
};
