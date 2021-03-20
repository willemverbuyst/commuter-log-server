import { reduceDates } from '../utils';

// POLAR CHART, days car, public transport, working from home
export const getPartitionData = (logData) => {
  const partition = getPartition(logData);
  const labels = ['', '', ''];
  const title = `DAYS CAR / PUBLIC TRANSPORT / WORKING FORM HOME`;

  return {
    partition,
    labels,
    title,
  };
};

const getPartition = (logData) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(logData);

  const workingFromHome = reducedDates.filter(
    (day) => day.statusOfDay === 'working from home'
  ).length;
  const travelledByCar = reducedDates.filter(
    (day) =>
      day.statusOfDay === 'working at the office' &&
      day.meansOfTransport === 'car'
  ).length;
  const travelledByPublicTransport = reducedDates.filter(
    (day) =>
      day.statusOfDay === 'working at the office' &&
      day.meansOfTransport === 'public transport'
  ).length;

  return [workingFromHome, travelledByCar, travelledByPublicTransport];
};
