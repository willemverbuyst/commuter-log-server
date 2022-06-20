import { groupByWeekNumber, reduceDates } from '../utils';
import { getWeekNumber } from '../dateLogic';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';

// STACKED LINE CHART, total travel times per week
// Totals car, totals public transport
export const getTotalsPerWeekData = (logData) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);
  const weeks = groupByWeekNumber(reducedDates);
  const totalsPerWeekCar = weeks.map((week) => getTotalsPerWeek(week, 'CAR'));
  const totalsPerWeekPublic = weeks.map((week) =>
    getTotalsPerWeek(week, 'PUBLIC_TRANSPORT')
  );
  const backgroundColorCar = weeks.map(() => colorTravelByCar);
  const backgroundColorPublic = weeks.map(() => colorTravelByPublicTransport);

  const labels = weeks.map((a) => `w${getWeekNumber(new Date(a[0].date))[1]}`);
  const maxForDisplay =
    Math.max(
      ...totalsPerWeekCar.map(
        (totalPerWeekCar, i) => totalPerWeekCar + totalsPerWeekPublic[i]
      )
    ) * 1.05;
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
  // Use .flatMap for type safe filtering
  const weekTransport = week.flatMap((day) =>
    // day.statusOfDay === 'working at the office' &&
    day.meansOfTransport === transport ? [day] : []
  );

  const totalPerTransport =
    weekTransport.length > 0
      ? weekTransport.map((day) => day.durationTrip).reduce((a, b) => a + b)
      : 0;

  return totalPerTransport;
};
