import { getWeekNumber } from './chartLogic';
import { chunkArray } from './utils';
import {
  travelByCarColor,
  travelByPublicTransportColor,
} from '../../UI/Colors';

// STACKED LINE CHART, total travel times per week
// Totals car, totals public transport
export const getTotalsPerWeekData = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);
  const totalsPerWeekCar = weeks.map((week) => getTotalsPerWeek(week, 'car'));
  const totalsPerWeekPublic = weeks.map((week) =>
    getTotalsPerWeek(week, 'public transport')
  );
  const backgroundColorCar = weeks.map(() => travelByCarColor);
  const backgroundColorPublic = weeks.map(() => travelByPublicTransportColor);

  const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
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
      ? weekTransport
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return totalPerTransport;
};

// DOUGHNUT CHART, car vs public chart
// Display total travel times public transport vs total travel times car
export const getCarVsPublicTotalsData = (workingDays) => {
  const totalsCar = getTotalsTransport(workingDays, 'car');
  const totalsPublic = getTotalsTransport(workingDays, 'public transport');
  const labels = ['', ''];
  const maxForDisplay =
    Math.max(totalsCar.totalTimeTravelled, totalsPublic.totalTimeTravelled) *
    1.2;
  const title = 'TOTAL TIMES CAR VS PUBLIC TRANSPORT';

  return {
    totalsCar,
    totalsPublic,
    labels,
    maxForDisplay,
    title,
  };
};

// Get the total of all working days at the office for car or for public transport
const getTotalsTransport = (workingDays, transport) => {
  const daysTravelled = workingDays.filter(
    (day) =>
      day.statusOfDay === 'working at the office' &&
      day.meansOfTransport === transport
  );
  const numberOfDaystravelled = daysTravelled.length;
  const totalTimeTravelled =
    daysTravelled.length > 0
      ? daysTravelled
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return {
    numberOfDaystravelled,
    totalTimeTravelled,
  };
};
