import { getWeekData } from './weekChartLogic';
import {
  testLogDateArrayTwoWeeks,
  testLogDateArrayWeekTwo,
} from '../../TestData/dummyData';
import { getBackgroundColor, getWeekdays } from './chartLogic';
import { getWeekNumber } from '../dateLogic';

describe('if getWeekData is given an array of logDates and a index', () => {
  const testTravelTimes = [90, 0, 90, 0.00001, 0];
  const testBackgroundColor = getBackgroundColor(testLogDateArrayWeekTwo);
  const testLabels = getWeekdays(testLogDateArrayWeekTwo);
  const testMaxforDisplay = 90 * 1.1;
  const testWeekNumber = getWeekNumber(testLogDateArrayWeekTwo[0].date);
  const testTitle = `TRAVEL TIMES WEEK ${testWeekNumber[1]} - ${testWeekNumber[0]}`;

  test('returns object with right properties', () => {
    expect(getWeekData(testLogDateArrayTwoWeeks, 1).travelTimes).toEqual(
      testTravelTimes
    );
    expect(getWeekData(testLogDateArrayTwoWeeks, 1).backgroundColor).toEqual(
      testBackgroundColor
    );
    expect(getWeekData(testLogDateArrayTwoWeeks, 1).labels).toEqual(testLabels);
    expect(getWeekData(testLogDateArrayTwoWeeks, 1).maxForDisplay).toBe(
      testMaxforDisplay
    );
    expect(getWeekData(testLogDateArrayTwoWeeks, 1).title).toBe(testTitle);

    expect(getWeekData(testLogDateArrayTwoWeeks, 1)).toEqual({
      travelTimes: testTravelTimes,
      backgroundColor: testBackgroundColor,
      labels: testLabels,
      maxForDisplay: testMaxforDisplay,
      title: testTitle,
    });
  });
});
