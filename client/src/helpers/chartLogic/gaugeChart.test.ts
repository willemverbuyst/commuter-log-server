import {
  actualTravelTime,
  getHigestTravelTime,
  getTotalsPerWeek,
  normWorkTravel,
  timeMapsTravel,
} from './gaugeChart';
import {
  testLogDateArrayWeekOne,
  testLogDateArrayWeekTwo,
  testLogDateArrayTwoWeeks,
} from '../../TestData/dummyData';
import { getMinutes } from './chartLogic';

describe('if actualTravelTime is given an array of logDates and a weeknumber', () => {
  test('returns object with right properties', () => {
    const testMax = getHigestTravelTime(testLogDateArrayTwoWeeks);
    const testTravelTimesPerDay = getMinutes(testLogDateArrayWeekOne);

    const testTotalPerWeek = Math.floor(
      testTravelTimesPerDay.reduce((a, b) => a + b)
    );
    expect(actualTravelTime(testLogDateArrayTwoWeeks, 0)).toEqual({
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        '#aaa',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 39, 204, 1)',
      ],
      backGroundColorInner: [
        'transparent',
        '#aaa',
        'transparent',
        'transparent',
        'transparent',
      ],
      data: [
        testTotalPerWeek,
        20,
        normWorkTravel - testTotalPerWeek,
        timeMapsTravel - normWorkTravel,
        testMax - timeMapsTravel,
      ],
    });
  });
});

describe('if getHigestTravelTime is given an array of logDates', () => {
  test('returns a the highest total', () => {
    expect(getHigestTravelTime(testLogDateArrayTwoWeeks)).toEqual(660);
  });
});

describe('if getTotalsPerWeek is given an array of logDates', () => {
  test('returns a the total per week as number', () => {
    expect(getTotalsPerWeek(testLogDateArrayWeekOne)).toEqual(660);
    expect(getTotalsPerWeek(testLogDateArrayWeekTwo)).toEqual(180);
  });
});
