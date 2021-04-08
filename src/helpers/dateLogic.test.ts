import { getDay, getWeekNumber, getYear } from './dateLogic';

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
