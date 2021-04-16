import type { LogDate } from '../models/Logdata';

export const testLogDateOneA: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-04T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateOneB: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-04T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateTwo: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-05T00:00:00.000Z'),
  durationTrip: 30,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateThree: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-06T00:00:00.000Z'),
  durationTrip: 60,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateFour: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-07T00:00:00.000Z'),
  durationTrip: 300,
  meansOfTransport: 'public transport',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateFive: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-08T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 1,
};
export const testLogDateSix: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-11T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 2,
};
export const testLogDateSeven: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-12T00:00:00.000Z'),
  statusOfDay: 'day off',
  weekNumber: 2,
};
export const testLogDateEight: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-13T00:00:00.000Z'),
  durationTrip: 90,
  meansOfTransport: 'car',
  routeTripFrom: 'test_start',
  routeTripTo: 'test_destination',
  statusOfDay: 'working at the office',
  weekNumber: 2,
};
export const testLogDateNine: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-14T00:00:00.000Z'),
  statusOfDay: 'working from home',
  weekNumber: 2,
};
export const testLogDateTen: LogDate = {
  id: 'test_id',
  date: new Date('2021-01-15T00:00:00.000Z'),
  statusOfDay: 'day off',
  weekNumber: 2,
};

export const testLogDateArrayWeekOne = [
  testLogDateOneA,
  testLogDateOneB,
  testLogDateTwo,
  testLogDateThree,
  testLogDateFour,
  testLogDateFive,
];

export const testLogDateArrayWeekTwo = [
  testLogDateSix,
  testLogDateSeven,
  testLogDateEight,
  testLogDateNine,
  testLogDateTen,
];

export const testLogDateArrayTwoWeeks = [
  ...testLogDateArrayWeekOne,
  ...testLogDateArrayWeekTwo,
];
