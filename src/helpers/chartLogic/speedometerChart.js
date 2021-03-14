import { getMinutes, getWeekNumber } from './chartLogic';
import { chunkArray } from '../utils';

// Travel time per week which is considered acceptable according employer
const normWorkTravel = 5 * 2 * 75;
// Travel time per week according to google maps
const timeMapsTravel = 5 * 2 * 90;

const getTotalsPerWeek = (week) => {
  const weekWithoutDayOff = week.filter(
    (day) => day.statusOfDay === 'working at the office'
  );

  const totalPerWeek =
    weekWithoutDayOff.length > 0
      ? weekWithoutDayOff
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return totalPerWeek;
};

const getHigestTravelTime = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);

  const totals = weeks.map((week) => getTotalsPerWeek(week));

  const maximum = Math.max(...totals);

  return maximum;
};

export const actualTravelTime = (dates, weekNumber) => {
  // const week = dates.filter((d) => getWeekNumber(d.date)[1] === +weekNumber);
  const weeks = chunkArray(dates, 5);
  const week = weeks[weekNumber];

  const max = getHigestTravelTime(dates);

  const travelTimesPerDay = getMinutes(week);

  const totalPerWeek = Math.floor(travelTimesPerDay.reduce((a, b) => a + b));

  if (totalPerWeek <= normWorkTravel) {
    return {
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        '#aaa',
        'rgba(255, 159, 64, 1)',
        'red',
        'darkred',
      ],
      backGroundColorInner: [
        'transparent',
        '#aaa',
        'transparent',
        'transparent',
        'transparent',
      ],
      data: [
        totalPerWeek,
        20,
        normWorkTravel + 20 - totalPerWeek,
        timeMapsTravel - normWorkTravel,
        max - timeMapsTravel,
      ],
    };
  } else if (totalPerWeek > normWorkTravel && totalPerWeek <= timeMapsTravel) {
    return {
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        'red',
        '#aaa',
        'red',
        'darkred',
      ],
      backGroundColorInner: [
        'transparent',
        'transparent',
        '#aaa',
        'transparent',
        'transparent',
      ],
      data: [
        normWorkTravel,
        timeMapsTravel - totalPerWeek,
        20,
        timeMapsTravel + 20 - totalPerWeek,
        max - timeMapsTravel,
      ],
    };
  } else if (totalPerWeek > timeMapsTravel && totalPerWeek < max) {
    return {
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        'red',
        'darkred',
        '#aaa',
        'darkred',
      ],
      backGroundColorInner: [
        'transparent',
        'transparent',
        'transparent',
        '#aaa',
        'transparent',
      ],
      data: [
        normWorkTravel,
        timeMapsTravel - normWorkTravel,
        max - totalPerWeek,
        20,
        max + 20 - totalPerWeek,
      ],
    };
  } else {
    return {
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        'red',
        'darkred',
        'transparent',
        '#aaa',
      ],
      backGroundColorInner: [
        'transparent',
        'transparent',
        'transparent',
        'transparent',
        '#aaa',
      ],
      data: [
        normWorkTravel,
        timeMapsTravel - normWorkTravel,
        max - timeMapsTravel,
        0,
        20,
      ],
    };
  }
};
