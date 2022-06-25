import { reduceDates } from '../utils';

// POLAR CHART, days car, public transport, working from home
export const getPartitionData = (logData) => {
  const partition = getPartition(logData);
  const labels = ['home', 'car', 'public transport'];
  const title = `DAYS WORKING FORM HOME / TRAVELLED BY CAR / TRAVELLED BY PUBLIC TRANSPORT`;

  return {
    partition,
    labels,
    title,
  };
};

export const getPartition = (logData) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);

  const workingFromHome = reducedDates.filter(
    (day) => day.statusOfDay === 'WORKING_FROM_HOME'
  ).length;
  const travelledByCar = reducedDates.filter(
    (day) =>
      day.statusOfDay === 'WORKING_AT_THE_OFFICE' &&
      day.meansOfTransport === 'CAR'
  ).length;
  const travelledByPublicTransport = reducedDates.filter(
    (day) =>
      day.statusOfDay === 'WORKING_AT_THE_OFFICE' &&
      day.meansOfTransport === 'PUBLIC_TRANSPORT'
  ).length;

  return [workingFromHome, travelledByCar, travelledByPublicTransport];
};
