import { getWeekNumber } from './chartLogic';
import { chunkArray } from './utils';

// STEP LINE CHART, average travel time per week
export const getAveragePerWeekData = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);
  const averages = weeks.map((week) => getAveragePerWeek(week));
  const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
  const maxForDisplay = Math.max(...averages) * 1.2;
  const title = `AVERAGE TRAVEL TIMES PER WEEK`;

  return {
    averages,
    labels,
    maxForDisplay,
    title,
  };
};

const getAveragePerWeek = (week) => {
  const weekWithoutDayOff = week.filter((day) => day.statusOfDay !== 'day off');
  const average =
    weekWithoutDayOff.length > 0
      ? weekWithoutDayOff
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b) / weekWithoutDayOff.length
      : 0;

  return average;
};
