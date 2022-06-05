import {
  getDay,
  getWeekNumber,
  getYear,
  sortByDateAscending,
  sortByDateDescending,
} from './dateLogic';
import {
  testLogDateEight,
  testLogDateNine,
  testLogDateTen,
} from '../TestData/dummyData';

describe('if getDay is given a date', () => {
  test('returns a string', () => {
    expect(getDay(new Date('2021-01-01T00:00:00.000Z'))).toBe('Fri Jan 01');
    expect(getDay(new Date('1/1/2021'))).toBe('Fri Jan 01');
  });
});

describe('if getWeekNumber is given a date', () => {
  test('returns an array with year and weeknumber', () => {
    expect(getWeekNumber(new Date('1/1/2021'))).toEqual([2020, 53]);
    expect(getWeekNumber(new Date('2021-01-06T00:00:00.000Z'))).toEqual([
      2021,
      1,
    ]);
  });
});

describe('if getYear is given a date', () => {
  test('returns a string', () => {
    expect(getYear(new Date('1/1/2021'))).toBe('2021');
    expect(getYear(new Date('2021-01-06T00:00:00.000Z'))).toBe('2021');
  });
});

describe('if sortByDateAscending is given a array with logDates', () => {
  test('returns a sorted array with logDates', () => {
    expect(
      sortByDateAscending([testLogDateNine, testLogDateTen, testLogDateEight])
    ).toEqual([testLogDateEight, testLogDateNine, testLogDateTen]);
    expect(
      sortByDateAscending([testLogDateNine, testLogDateTen, testLogDateEight])
    ).not.toEqual([testLogDateTen, testLogDateNine, testLogDateEight]);
  });
});

describe('if sortByDateDescending is given a array with logDates', () => {
  test('returns a sorted array with logDates', () => {
    expect(
      sortByDateDescending([testLogDateNine, testLogDateTen, testLogDateEight])
    ).toEqual([testLogDateTen, testLogDateNine, testLogDateEight]);
    expect(
      sortByDateDescending([testLogDateNine, testLogDateTen, testLogDateEight])
    ).not.toEqual([testLogDateEight, testLogDateNine, testLogDateTen]);
  });
});
