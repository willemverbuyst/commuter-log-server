import {
  getCarVsPublicTotalsData,
  getTotalsTransport,
} from './carVsPublicChart';
import {
  testLogDateArrayTwoWeeks,
  testLogDateArrayWeekOne,
  testLogDateArrayWeekTwo,
} from '../../TestData/dummyData';

describe('if getCarVsPublicTotalsData is given an array of logDates', () => {
  const testTotalsCar = {
    numberOfDaystravelled: 6,
    totalTimeTravelled: 540,
  };
  const testTotalsPublic = {
    numberOfDaystravelled: 1,
    totalTimeTravelled: 300,
  };
  const testLabels = ['car', 'public transport'];
  const testTitle = 'TOTAL TIMES CAR VS PUBLIC TRANSPORT';

  test('returns object with right properties', () => {
    expect(
      getCarVsPublicTotalsData(testLogDateArrayTwoWeeks).totalsCar
    ).toEqual(testTotalsCar);
    expect(
      getCarVsPublicTotalsData(testLogDateArrayTwoWeeks).totalsPublic
    ).toEqual(testTotalsPublic);
    expect(getCarVsPublicTotalsData(testLogDateArrayTwoWeeks).labels).toEqual(
      testLabels
    );
    expect(getCarVsPublicTotalsData(testLogDateArrayTwoWeeks).title).toBe(
      testTitle
    );
    expect(getCarVsPublicTotalsData(testLogDateArrayTwoWeeks)).toEqual({
      totalsCar: testTotalsCar,
      totalsPublic: testTotalsPublic,
      labels: testLabels,
      title: testTitle,
    });
  });
});

describe('if   getTotalsTransport, is given an array of logDates and the transport', () => {
  const testTotalsCar = {
    numberOfDaystravelled: 2,
    totalTimeTravelled: 180,
  };
  const testTotalsPublic = {
    numberOfDaystravelled: 1,
    totalTimeTravelled: 300,
  };
  test('returns an object', () => {
    expect(
      getTotalsTransport(testLogDateArrayWeekOne, 'public transport')
    ).toEqual(testTotalsPublic);
  });
  expect(getTotalsTransport(testLogDateArrayWeekTwo, 'car')).toEqual(
    testTotalsCar
  );
});
