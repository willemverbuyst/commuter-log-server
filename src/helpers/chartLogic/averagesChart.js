import { getWeekNumber } from './chartLogic';
import { chunkArray } from './utils';
import {
  travelByCarColor,
  travelByPublicTransportColor,
} from '../../UI/Colors';

export const getAveragePerWeekData = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);
  const averages = weeks.map((week) => getAveragePerWeek(week));
  const backgroundColor = weeks.map(() => travelByCarColor);

  const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
  const maxForDisplay = Math.max(...averages) * 1.2;
  const title = `AVERAGE TRAVEL TIMES PER WEEK`;

  return {
    averages,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  };
};

const getAveragePerWeek = (week) => {
  const weekWithoutDayOff = week.filter((day) => !day.holiday);
  const average =
    weekWithoutDayOff.length > 0
      ? weekWithoutDayOff
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b) / weekWithoutDayOff.length
      : 0;

  return average;
};
// export const getAveragePerWeekData = (workingDays) => {
//   const weeks = chunkArray(workingDays, 5);
//   const averagesPerWeekCar = weeks.map((week) =>
//     getAveragePerWeek(week, 'car')
//   );
//   const averagesPerWeekPublic = weeks.map((week) =>
//     getAveragePerWeek(week, 'public transport')
//   );
//   const backgroundColorCar = weeks.map(() => travelByCarColor);
//   const backgroundColorPublic = weeks.map(() => travelByPublicTransportColor);

//   const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
//   const maxForDisplay =
//     Math.max(...averagesPerWeekCar, ...averagesPerWeekPublic) * 1.2;
//   const title = `AVERAGE TRAVEL TIMES PER WEEK`;

//   return {
//     averagesPerWeekCar,
//     averagesPerWeekPublic,
//     backgroundColorCar,
//     backgroundColorPublic,
//     labels,
//     maxForDisplay,
//     title,
//   };
// };

// const getAveragePerWeek = (week, transport) => {
//   const weekTransport = week.filter(
//     (day) => !day.holiday && day.meansOfTransport === transport
//   );
//   const averagePerTransport =
//     weekTransport.length > 0
//       ? weekTransport
//           .map((day) => day.durationTripOne + day.durationTripTwo)
//           .reduce((a, b) => a + b) / week.length
//       : 0;

//   return averagePerTransport;
// };
