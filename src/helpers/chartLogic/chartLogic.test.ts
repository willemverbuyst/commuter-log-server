import type { LogDate } from '../../models/Logdata';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';
import { getBackgroundColor, getMinutes, getWeekdays } from './chartLogic';

const testLogDateOne: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-04T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};

const testLogDateTwo: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-05T00:00:00.000Z'),
  durationTrip: 60,
  meansOfTransport: 'public transport',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};

const testLogDateThree: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-06T00:00:00.000Z'),
  durationTrip: 0,
  statusOfDay: 'working from home',
  weekNumber: 1,
};

describe('if getBackgroundColor is given an array of logDates', () => {
  test('returns a the corresponding background colors', () => {
    expect(getBackgroundColor([testLogDateOne])).toEqual([colorTravelByCar]);
    expect(getBackgroundColor([testLogDateTwo])).toEqual([
      colorTravelByPublicTransport,
    ]);
    expect(getBackgroundColor([testLogDateOne, testLogDateTwo])).toEqual([
      colorTravelByCar,
      colorTravelByPublicTransport,
    ]);
  });
});

describe('if getMinutes is given an array of logDates', () => {
  test('returns a the array with minutes', () => {
    expect(getMinutes([testLogDateOne])).toEqual([90]);
    expect(getMinutes([testLogDateTwo])).toEqual([60]);
    expect(getMinutes([testLogDateThree])).toEqual([0.00001]);
    expect(getMinutes([testLogDateThree])).not.toEqual([0.0001]);
    expect(getMinutes([testLogDateOne, testLogDateTwo])).toEqual([90, 60]);
    expect(
      getMinutes([testLogDateOne, testLogDateTwo, testLogDateThree])
    ).toEqual([90, 60, 0.00001]);
  });
});

describe('if getWeekdays is given an array of logDates', () => {
  test('returns a the array with weekdays', () => {
    expect(getWeekdays([testLogDateOne])).toEqual(['Monday']);
    expect(getWeekdays([testLogDateTwo])).toEqual(['Tuesday']);
    expect(getWeekdays([testLogDateThree])).toEqual(['Wednesday']);
    expect(getWeekdays([testLogDateThree])).not.toEqual(['Friday']);
    expect(getWeekdays([testLogDateOne, testLogDateTwo])).toEqual([
      'Monday',
      'Tuesday',
    ]);
    expect(
      getWeekdays([testLogDateOne, testLogDateTwo, testLogDateThree])
    ).toEqual(['Monday', 'Tuesday', 'Wednesday']);
  });
});
