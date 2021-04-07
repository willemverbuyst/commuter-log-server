import { getNumberOfWeeks, getStatuses } from './logDataLogic';
import {
  testLogDateArrayOneWeek,
  testLogDateArrayTwoWeeks,
} from '../TestData/dummyData';

describe('if getNumberOfWeeks is given an array', () => {
  test('returns number of weeks', () => {
    expect(getNumberOfWeeks(testLogDateArrayOneWeek)).toBe(1);
    expect(getNumberOfWeeks(testLogDateArrayTwoWeeks)).toBe(2);
  });
});

describe('if getStatus is given an array', () => {
  test('returns an array with unique statuses', () => {
    expect(getStatuses(testLogDateArrayOneWeek)).toEqual([
      'working at the office',
    ]);
    expect(getStatuses(testLogDateArrayTwoWeeks)).toEqual([
      'working at the office',
      'working from home',
      'day off',
    ]);
  });
});
