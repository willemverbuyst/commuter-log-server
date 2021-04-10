import { getAveragePerWeek, getAveragePerWeekData } from './averagesChart';
import {
  testLogDateArrayWeekOne,
  testLogDateArrayWeekTwo,
  testLogDateArrayTwoWeeks,
} from '../../TestData/dummyData';
import { getWeekNumber } from '../dateLogic';
import { reduceDates } from '../utils';

describe('if getAveragePerWeekData is given an array of logDates', () => {
  const testAverages = [
    getAveragePerWeek(reduceDates(testLogDateArrayWeekOne)),
    getAveragePerWeek(testLogDateArrayWeekTwo),
  ];
  const testLabels = [
    `w${getWeekNumber(testLogDateArrayWeekOne[0].date)[1]}`,
    `w${getWeekNumber(testLogDateArrayWeekTwo[0].date)[1]}`,
  ];
  const testMaxforDisplay = Math.max(...testAverages) * 1.2;
  const testTitle = `AVERAGE TRAVEL TIMES PER WEEK`;

  test('returns object with right properties', () => {
    expect(getAveragePerWeekData(testLogDateArrayTwoWeeks).averages).toEqual(
      testAverages
    );
    expect(getAveragePerWeekData(testLogDateArrayTwoWeeks).maxForDisplay).toBe(
      testMaxforDisplay
    );
    expect(getAveragePerWeekData(testLogDateArrayTwoWeeks).labels).toEqual(
      testLabels
    );
    expect(getAveragePerWeekData(testLogDateArrayTwoWeeks).title).toBe(
      testTitle
    );
    expect(getAveragePerWeekData(testLogDateArrayTwoWeeks)).toEqual({
      averages: testAverages,
      maxForDisplay: testMaxforDisplay,
      labels: testLabels,
      title: testTitle,
    });
  });
});

describe('if getAveragePerWeek is given an array of logDates', () => {
  test('returns a number', () => {
    expect(getAveragePerWeek(testLogDateArrayWeekTwo)).toBe(60);
  });
});
