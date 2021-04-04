import type { LogDate } from '../../models/Logdata';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';
import { getBackgroundColor } from './chartLogic';

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
  durationTrip: 90,
  meansOfTransport: 'public transport',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
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
