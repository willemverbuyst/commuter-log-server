import type { LogDate } from '../models/Logdata';
import { getUniqueValues, reduceDates } from './utils';
import {
  testLogDateOneA,
  testLogDateOneB,
  testLogDateTwo,
} from '../TestData/dummyData';

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
    routeTripFrom: 'test_start_A',
    routeTripTo: 'test_destination_B',
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
