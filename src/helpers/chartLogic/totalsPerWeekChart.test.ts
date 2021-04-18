import {
  testLogDateArrayTwoWeeks,
  testLogDateArrayWeekOne,
  testLogDateArrayWeekTwo,
} from '../../TestData/dummyData';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';
import { getTotalsPerWeekData, getTotalsPerWeek } from './totalsPerWeekChart';

describe('if getTotalsPerWeekData is given an array of logDates', () => {
  const testTotalsPerWeekCar = [360, 180];
  const testTotalsPerWeekPublic = [300, 0];
  const testbackgroundColorCar = [colorTravelByCar, colorTravelByCar];
  const testbackgroundColorPublic = [
    colorTravelByPublicTransport,
    colorTravelByPublicTransport,
  ];
  const testLabels = ['w1', 'w2'];
  const testMaxForDisplay =
    Math.max(...testTotalsPerWeekCar, ...testTotalsPerWeekPublic) * 1.005;
  const testTitle = `TOTAL TRAVEL TIME PER WEEK`;

  test('returns object with right properties', () => {
    expect(
      getTotalsPerWeekData(testLogDateArrayTwoWeeks).totalsPerWeekCar
    ).toEqual(testTotalsPerWeekCar);
    expect(
      getTotalsPerWeekData(testLogDateArrayTwoWeeks).totalsPerWeekPublic
    ).toEqual(testTotalsPerWeekPublic);
    expect(
      getTotalsPerWeekData(testLogDateArrayTwoWeeks).backgroundColorCar
    ).toEqual(testbackgroundColorCar);
    expect(
      getTotalsPerWeekData(testLogDateArrayTwoWeeks).backgroundColorPublic
    ).toEqual(testbackgroundColorPublic);
    expect(getTotalsPerWeekData(testLogDateArrayTwoWeeks).labels).toEqual(
      testLabels
    );
    expect(
      getTotalsPerWeekData(testLogDateArrayTwoWeeks).maxForDisplay
    ).toEqual(testMaxForDisplay);
    expect(getTotalsPerWeekData(testLogDateArrayTwoWeeks).title).toEqual(
      testTitle
    );
    expect(getTotalsPerWeekData(testLogDateArrayTwoWeeks)).toEqual({
      totalsPerWeekCar: testTotalsPerWeekCar,
      totalsPerWeekPublic: testTotalsPerWeekPublic,
      backgroundColorCar: testbackgroundColorCar,
      backgroundColorPublic: testbackgroundColorPublic,
      labels: testLabels,
      maxForDisplay: testMaxForDisplay,
      title: testTitle,
    });
  });
});

describe('if getTotalsPerWeek is given an array of logDates and a means of transport', () => {
  test('returns a number', () => {
    expect(getTotalsPerWeek(testLogDateArrayWeekOne, 'car')).toEqual(360);
    expect(getTotalsPerWeek(testLogDateArrayWeekTwo, 'car')).toEqual(180);
    expect(
      getTotalsPerWeek(testLogDateArrayWeekOne, 'public transport')
    ).toEqual(300);
    expect(
      getTotalsPerWeek(testLogDateArrayWeekTwo, 'public transport')
    ).toEqual(0);
  });
});
