import { reduceDates } from '../utils';

// DOUGHNUT CHART, car vs public chart
// Display total travel times public transport vs total travel times car
export const getCarVsPublicTotalsData = (logData) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);

  const totalsCar = getTotalsTransport(reducedDates, 'car');
  const totalsPublic = getTotalsTransport(reducedDates, 'public transport');
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
      ? daysTravelled.map((day) => day.durationTrip).reduce((a, b) => a + b)
      : 0;

  return {
    numberOfDaystravelled,
    totalTimeTravelled,
  };
};
