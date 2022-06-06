import {
  getNumberOfWeeks,
  getUniqueStatuses,
  getUniqueWeekNumbers,
  getYearAndWeekNumber,
  getUniqueYears,
} from './logDataLogic';
import {
  testLogDateArrayWeekOne,
  testLogDateArrayWeekTwo,
  testLogDateArrayTwoWeeks,
} from '../TestData/dummyData';

describe('if getNumberOfWeeks is given an array', () => {
  test('returns number of weeks', () => {
    expect(getNumberOfWeeks(testLogDateArrayWeekOne)).toBe(1);
    expect(getNumberOfWeeks(testLogDateArrayTwoWeeks)).toBe(2);
  });
});

describe('if getUniqueStatuses is given an array', () => {
  test('returns an array with unique statuses', () => {
    expect(getUniqueStatuses(testLogDateArrayWeekOne)).toEqual([
      'working at the office',
    ]);
    expect(getUniqueStatuses(testLogDateArrayTwoWeeks)).toEqual([
      'day off',
      'working at the office',
      'working from home',
    ]);
  });
});

describe('if getUniqueWeekNumbers is given an array', () => {
  test('returns an array with unique weeknumbers', () => {
    expect(getUniqueWeekNumbers(testLogDateArrayWeekOne)).toEqual([1]);
    expect(getUniqueWeekNumbers(testLogDateArrayWeekTwo)).toEqual([2]);
    expect(getUniqueWeekNumbers(testLogDateArrayTwoWeeks)).toEqual([1, 2]);
  });
});

describe('if getYearAndWeekNumber is given an array and a index', () => {
  test('returns an array with year and weeknumber', () => {
    expect(getYearAndWeekNumber(testLogDateArrayTwoWeeks, 0)).toEqual([
      2021,
      1,
    ]);
    expect(getYearAndWeekNumber(testLogDateArrayTwoWeeks, 1)).toEqual([
      2021,
      2,
    ]);
  });
});

describe('if getUniqueYears is given an array', () => {
  test('returns an array with unique years', () => {
    expect(getUniqueYears(testLogDateArrayWeekOne)).toEqual(['2021']);
    expect(getUniqueYears(testLogDateArrayTwoWeeks)).toEqual(['2021']);
  });
});
