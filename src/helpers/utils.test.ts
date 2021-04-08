import type { LogDate } from '../models/Logdata';
import { chunkArray, getUniqueValues, reduceDates } from './utils';

const logDate: LogDate = {
  date: new Date('1/1/2021'),
  durationTrip: 30,
  meansOfTransport: 'car',
  routeTripFrom: '',
  routeTripTo: '',
  statusOfDay: 'working from home',
  weekNumber: 1,
};

const logDateTwo: LogDate = {
  date: new Date('1/2/2021'),
  durationTrip: 0,
  meansOfTransport: 'car',
  routeTripFrom: '',
  routeTripTo: '',
  statusOfDay: 'working from home',
  weekNumber: 1,
};

const logDateReduced = {
  date: new Date('1/1/2021'),
  durationTrip: 60,
  meansOfTransport: 'car',
  routeTripFrom: '',
  routeTripTo: '',
  statusOfDay: 'working from home',
  weekNumber: 1,
};

const logDateThree = [logDate, logDate];
const logDateFour = [logDate, logDate, logDate, logDate];

describe('if chunkArray is given an array', () => {
  test('returns a chunked array', () => {
    expect(chunkArray<LogDate>(logDateThree, 1)).toEqual([
      [logDate],
      [logDate],
    ]);
    expect(chunkArray<LogDate>(logDateFour, 2)).toEqual([
      logDateThree,
      logDateThree,
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
  test('returns a reduces array', () => {
    expect(reduceDates([logDate, logDate, logDateTwo])).toEqual([
      logDateReduced,
      logDateTwo,
    ]);
  });
  test('returns a reduces array', () => {
    expect(reduceDates([logDate, logDate, logDateTwo])).not.toEqual([
      logDate,
      logDate,
      logDateTwo,
    ]);
  });
});
