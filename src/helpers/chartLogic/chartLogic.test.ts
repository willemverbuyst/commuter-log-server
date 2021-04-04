import type { LogDate } from '../../models/Logdata';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';
import { getBackgroundColor, getMinutes } from './chartLogic';

const testLogDateOne: LogDate = {
  id: 'test_id',
  date: new Date(),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};

const testLogDateTwo: LogDate = {
  id: 'test_id',
  date: new Date(),
  durationTrip: 60,
  meansOfTransport: 'public transport',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};

const testLogDateThree: LogDate = {
  id: 'test_id',
  date: new Date(),
  durationTrip: 0,
  meansOfTransport: '',
  routeTripFrom: '',
  routeTripTo: '',
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
