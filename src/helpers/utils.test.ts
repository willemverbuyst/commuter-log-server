import type { LogDate } from '../models/Logdata';
import { chunkArray } from './utils';

const logDate: LogDate = {
  date: new Date(),
  durationTrip: 0,
  meansOfTransport: 'car',
  routeTripFrom: '',
  routeTripTo: '',
  statusOfDay: 'working from home',
  weekNumber: 1,
};

const logDateTwo = [logDate, logDate];
const logDateFour = [logDate, logDate, logDate, logDate];

describe('if chunkArray is given an array', () => {
  test('returns a chunked array', () => {
    expect(chunkArray(logDateTwo, 1)).toEqual([[logDate], [logDate]]);
    expect(chunkArray(logDateFour, 2)).toEqual([logDateTwo, logDateTwo]);
  });
});
