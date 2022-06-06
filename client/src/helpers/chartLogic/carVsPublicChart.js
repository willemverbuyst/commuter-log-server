import { reduceDates } from '../utils';

// DOUGHNUT CHART, car vs public chart
// Display total travel times public transport vs total travel times car
export const getCarVsPublicTotalsData = (logData) => {
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
export const getTotalsTransport = (workingDays, transport) => {
  // Use .flatMap for type safe filtering
  const daysTravelled = workingDays.flatMap((day) =>
    day.statusOfDay === 'working at the office' &&
    day.meansOfTransport === transport
      ? [day]
      : []
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
