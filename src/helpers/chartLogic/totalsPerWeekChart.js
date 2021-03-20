import { chunkArray, reduceDates } from '../utils';
import { getWeekNumber } from './chartLogic';
import {
  travelByCarColor,
  travelByPublicTransportColor,
} from '../../UI/Colors';

// STACKED LINE CHART, total travel times per week
// Totals car, totals public transport
export const getTotalsPerWeekData = (logData) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const weeks = chunkArray(reducedDates, 5);
  const totalsPerWeekCar = weeks.map((week) => getTotalsPerWeek(week, 'car'));
  const totalsPerWeekPublic = weeks.map((week) =>
    getTotalsPerWeek(week, 'public transport')
  );
  const backgroundColorCar = weeks.map(() => travelByCarColor);
  const backgroundColorPublic = weeks.map(() => travelByPublicTransportColor);

  const labels = weeks.map((a) => `w${getWeekNumber(a[0].date)[1]}`);
  const maxForDisplay =
    Math.max(...totalsPerWeekCar, ...totalsPerWeekPublic) * 1.2;
  const title = `TOTAL TRAVEL TIME PER WEEK`;

  return {
    totalsPerWeekCar,
    totalsPerWeekPublic,
    backgroundColorCar,
    backgroundColorPublic,
    labels,
    maxForDisplay,
    title,
  };
};

export const getTotalsPerWeek = (week, transport) => {
  const weekTransport = week.filter(
    (day) =>
      day.statusOfDay === 'working at the office' &&
      day.meansOfTransport === transport
  );
  const totalPerTransport =
    weekTransport.length > 0
      ? weekTransport.map((day) => day.durationTrip).reduce((a, b) => a + b)
      : 0;

  return totalPerTransport;
};
