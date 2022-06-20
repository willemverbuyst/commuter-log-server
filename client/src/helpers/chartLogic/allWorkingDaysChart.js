import { reduceDates } from '../utils';

export const getAllWorkingDaysData = (logData) => {
  const reducedDates = reduceDates(logData);

  // Use .flatMap for type safe filtering
  const withoutDayOff = reducedDates.flatMap((day) =>
    day.statusOfDay !== 'DAY_OFF' ? [day] : []
  );

  const travelTimes = withoutDayOff.map((day) =>
    day.statusOfDay === 'WORKING_FROM_HOME' ? 0 : day.durationTrip
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
