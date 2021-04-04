import type { LogDate } from '../../models/Logdata';
import { reduceDates } from '../utils';

export const getAllWorkingDaysData = (
  logData: LogDate[]
): {
  travelTimes: number[];
  maxForDisplay: number;
  labels: string[];
  title: string;
  lineValue: number[];
} => {
  const reducedDates = reduceDates(logData);
  const withoutDayOff = reducedDates.filter(
    (day) => day.statusOfDay !== 'day off'
  );
  const travelTimes = withoutDayOff.map((day) => day.durationTrip);

  const labels = withoutDayOff.map(() => '');
  const maxForDisplay = Math.max(...travelTimes) * 1.05;
  const title = `TRAVEL TIMES`;
  const lineValue = withoutDayOff.map(
    () => travelTimes.reduce((a, b) => a + b) / travelTimes.length
  );

  return {
    travelTimes,
    maxForDisplay,
    labels,
    title,
    lineValue,
  };
};
