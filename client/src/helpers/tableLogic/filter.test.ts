import { filterData } from './filter';
import {
  testLogDateOneA,
  testLogDateOneB,
  testLogDateArrayTwoWeeks,
  testLogDateTwo,
  testLogDateArrayWeekTwo,
  testLogDateSeven,
  testLogDateTen,
  testLogDateSix,
  testLogDateEight,
  testLogDateNine,
} from '../../TestData/dummyData';

describe('if testLogDateArrayTwoWeeks is given an array of logDates, a value and dropdown', () => {
  test('returns an array with logDates', () => {
    expect(
      filterData(testLogDateArrayTwoWeeks, 'test_start_A', 'routeFrom')
    ).toEqual([testLogDateOneA, testLogDateOneB]);
    expect(
      filterData(testLogDateArrayTwoWeeks, 'test_start_A', 'routeFrom')
    ).not.toEqual([testLogDateTwo]);
    expect(
      filterData(testLogDateArrayTwoWeeks, 'no_start', 'routeFrom')
    ).toEqual([]);
    expect(
      filterData(testLogDateArrayTwoWeeks, 'test_destination_B', 'routeTo')
    ).toEqual([testLogDateOneA, testLogDateOneB]);
    expect(
      filterData(testLogDateArrayTwoWeeks, 'test_destination_B', 'routeFrom')
    ).not.toEqual([testLogDateTwo]);
    expect(
      filterData(testLogDateArrayTwoWeeks, 'no_destination', 'routeFrom')
    ).toEqual([]);
    expect(
      filterData(testLogDateArrayWeekTwo, 'ascending', 'sortTravelTime')
    ).toEqual([
      testLogDateSeven,
      testLogDateTen,
      testLogDateNine,
      testLogDateSix,
      testLogDateEight,
    ]);
    expect(
      filterData(
        [testLogDateSeven, testLogDateNine, testLogDateTen],
        'ascending',
        'sortTravelTime'
      )
    ).toEqual([testLogDateNine, testLogDateSeven, testLogDateTen]);
  });
  expect(
    filterData(testLogDateArrayWeekTwo, 'descending', 'sortTravelTime')
  ).toEqual([
    testLogDateSix,
    testLogDateEight,
    testLogDateNine,
    testLogDateSeven,
    testLogDateTen,
  ]);
  expect(filterData(testLogDateArrayWeekTwo, 'day off', 'status')).toEqual([
    testLogDateSeven,
    testLogDateTen,
  ]);
  expect(
    filterData(testLogDateArrayWeekTwo, 'working from home', 'status')
  ).toEqual([testLogDateNine]);
  expect(
    filterData(testLogDateArrayWeekTwo, 'working at the office', 'status')
  ).toEqual([testLogDateSix, testLogDateEight]);
  expect(filterData(testLogDateArrayWeekTwo, 'all', 'week')).toEqual(
    testLogDateArrayWeekTwo
  );
  expect(filterData(testLogDateArrayWeekTwo, '2', 'week')).toEqual(
    testLogDateArrayWeekTwo
  );
  expect(filterData(testLogDateArrayWeekTwo, '2020', 'year')).toEqual([]);
  expect(filterData(testLogDateArrayWeekTwo, '2021', 'year')).toEqual(
    testLogDateArrayWeekTwo
  );
});
