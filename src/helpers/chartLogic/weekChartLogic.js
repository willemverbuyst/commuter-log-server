import { chunkArray } from '../utils';
import {
  getBackgroundColor,
  getMinutes,
  getWeekdays,
  getWeekNumber,
} from './chartLogic';

import { workingDays } from '../../dummyData';

const reduceDates = (dates) => {
  let container = {};

  dates.forEach(function (d) {
    if (container.hasOwnProperty(d.date)) {
      container[d.date] = {
        ...d,
        durationTrip: container[d.date].durationTrip + d.durationTrip,
      };
    } else {
      container[d.date] = { ...d };
    }
  });

  let reducedDates = [];

  for (let prop in container) {
    reducedDates.push(container[prop]);
  }

  return reducedDates;
};

export const getWeekData = (dates, index) => {
  // Combine all the days with the same date
  const reducedDates = reduceDates(dates);
  // Get groups of 5
  const week = chunkArray(reducedDates, 5)[index];
  // Use the first day of the week to get week number and year
  const weekNumber = getWeekNumber(week[0].date);
  const travelTimes = getMinutes(week);
  const backgroundColor = getBackgroundColor(week);
  const labels = getWeekdays(week);
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
  const title = `TRAVEL TIMES WEEK ${weekNumber[1]} - ${weekNumber[0]}`;

  return {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  };
};
