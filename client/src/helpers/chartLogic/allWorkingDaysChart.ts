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
  const reducedDates: LogDate[] = reduceDates(logData);

  // Use .flatMap for type safe filtering
  const withoutDayOff = reducedDates.flatMap((day) =>
    day.statusOfDay !== 'day off' ? [day] : []
  );

  const travelTimes = withoutDayOff.map((day) =>
    day.statusOfDay === 'working from home' ? 0 : day.durationTrip
  );

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
