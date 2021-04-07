import { getNumberOfWeeks, getStatuses, getWeekNumbers } from './logDataLogic';
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

describe('if getStatuses is given an array', () => {
  test('returns an array with unique statuses', () => {
    expect(getStatuses(testLogDateArrayWeekOne)).toEqual([
      'working at the office',
    ]);
    expect(getStatuses(testLogDateArrayTwoWeeks)).toEqual([
      'working at the office',
      'working from home',
      'day off',
    ]);
  });
});

describe('if getWeekNumbers is given an array', () => {
  test('returns an array with unique weeknumbers', () => {
    expect(getWeekNumbers(testLogDateArrayWeekOne)).toEqual([1]);
    expect(getWeekNumbers(testLogDateArrayWeekTwo)).toEqual([2]);
    expect(getWeekNumbers(testLogDateArrayTwoWeeks)).toEqual([1, 2]);
  });
});
