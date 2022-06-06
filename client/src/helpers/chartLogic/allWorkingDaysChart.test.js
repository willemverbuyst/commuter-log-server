import { getAllWorkingDaysData } from './allWorkingDaysChart';
import { testLogDateArrayWeekTwo } from '../../TestData/dummyData';

describe('if getAllWorkingDaysData is given an array of logDates', () => {
  const testTravelTimes = [90, 90, 0];
  const testMaxforDisplay = 90 * 1.05;
  const testLabels = ['', '', ''];
  const testTitle = `TRAVEL TIMES`;
  const testLineValue = testTravelTimes.map(() => (90 + 90 + 0) / 3);

  test('returns object with right properties', () => {
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo).travelTimes).toEqual(
      testTravelTimes
    );
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo).maxForDisplay).toBe(
      testMaxforDisplay
    );
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo).labels).toEqual(
      testLabels
    );
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo).title).toBe(
      testTitle
    );
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo).lineValue).toEqual(
      testLineValue
    );
    expect(getAllWorkingDaysData(testLogDateArrayWeekTwo)).toEqual({
      travelTimes: testTravelTimes,
      maxForDisplay: testMaxforDisplay,
      labels: testLabels,
      title: testTitle,
      lineValue: testLineValue,
    });
  });
});
