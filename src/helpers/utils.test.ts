import type { LogDate } from '../models/Logdata';
import {
  chunkArray,
  getDay,
  getUniqueValues,
  getYear,
  reduceDates,
} from './utils';

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
    expect(chunkArray(logDateThree, 1)).toEqual([[logDate], [logDate]]);
    expect(chunkArray(logDateFour, 2)).toEqual([logDateThree, logDateThree]);
  });
});

describe('if getDay is given a date', () => {
  test('returns a string', () => {
    const testDay = new Date('1/1/2021');
    expect(getDay(testDay)).toBe('Fri Jan 01');
  });
});

describe('if getUniqueValues is given an value, index and array', () => {
  test('returns a boolean', () => {
    expect(getUniqueValues('x', 0, ['x', 'y', 'z'])).toBe(true);
    expect(getUniqueValues('x', 1, ['x', 'x', 'y', 'z'])).toBe(false);
    expect(getUniqueValues('y', 2, ['x', 'x', 'y', 'z'])).toBe(true);
    expect(getUniqueValues('y', 3, ['y', 'x', 'x', 'y', 'z'])).toBe(false);
  });
});

describe('if getYear is given a date', () => {
  test('returns a string', () => {
    const testDay = new Date('1/1/2021');
    expect(getYear(testDay)).toBe('2021');
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
