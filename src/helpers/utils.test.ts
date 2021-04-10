import type { LogDate } from '../models/Logdata';
import { chunkArray, getUniqueValues, reduceDates } from './utils';
import {
  testLogDateOneA,
  testLogDateOneB,
  testLogDateTwo,
  testLogDateThree,
  testLogDateFour,
  testLogDateFive,
  testLogDateArrayWeekOne,
  testLogDateArrayTwoWeeks,
} from '../TestData/dummyData';

describe('if chunkArray is given an array', () => {
  test('returns a chunked array', () => {
    expect(chunkArray<LogDate>(testLogDateArrayTwoWeeks, 1).length).toBe(
      testLogDateArrayTwoWeeks.length
    );
    expect(chunkArray<LogDate>(testLogDateArrayWeekOne, 2)).toEqual([
      [testLogDateOneA, testLogDateOneB],
      [testLogDateTwo, testLogDateThree],
      [testLogDateFour, testLogDateFive],
    ]);
    expect(chunkArray<Number>([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});

describe('if getUniqueValues is given an value, index and array', () => {
  test('returns a boolean', () => {
    expect(getUniqueValues('x', 0, ['x', 'y', 'z'])).toBe(true);
    expect(getUniqueValues('x', 1, ['x', 'x', 'y', 'z'])).toBe(false);
    expect(getUniqueValues('y', 2, ['x', 'x', 'y', 'z'])).toBe(true);
    expect(getUniqueValues('y', 3, ['y', 'x', 'x', 'y', 'z'])).toBe(false);
    expect(getUniqueValues(1, 1, [0, 1, 2, 3])).toBe(true);
    expect(getUniqueValues(3, 3, [3, 3, 3, 3, 3])).toBe(false);
    expect(getUniqueValues(true, 1, [false, true, true])).toBe(true);
    expect(getUniqueValues(true, 1, [false, true, true])).toBe(true);
  });
});

describe('if reduceDates is given an array', () => {
  const testDateReduced = {
    id: 'test_id',
    date: new Date('2021-01-04T00:00:00.000Z'),
    durationTrip: 180,
    meansOfTransport: 'car',
    routeTripFrom: 'test_start',
    routeTripTo: 'test_destination',
    statusOfDay: 'working at the office',
    weekNumber: 1,
  };

  test('returns a reduces array', () => {
    expect(
      reduceDates([testLogDateOneA, testLogDateOneB, testLogDateTwo])
    ).toEqual([testDateReduced, testLogDateTwo]);
  });
  test('returns a reduces array', () => {
    expect(
      reduceDates([testLogDateOneA, testLogDateOneB, testLogDateTwo])
    ).not.toEqual([testLogDateOneA, testLogDateOneB, testLogDateTwo]);
  });
});
