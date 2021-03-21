import { reduceDates } from '../utils';

export const getAllWorkingDaysData = (logData) => {
  const reducedDates = reduceDates(logData);
  const withoutDayOff = reducedDates.filter(
    (day) => day.statusOfDay !== 'day off'
  );
  const travelTimes = withoutDayOff.map((day) =>
    day.statusOfDay === 'working from home' ? 0 : day.durationTrip
  );

  const labels = withoutDayOff.map(() => '');
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
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
