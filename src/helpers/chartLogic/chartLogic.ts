import type { LogDate } from '../../models/Logdata';
import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getBackgroundColor = (dates: LogDate[]): string[] => {
  return dates.map((date) =>
    date.meansOfTransport === 'car'
      ? colorTravelByCar
      : colorTravelByPublicTransport
  );
};

export const getMinutes = (dates: LogDate[]): number[] => {
  return dates.map((date) => {
    return date.statusOfDay === 'working from home'
      ? 0.00001
      : date.durationTrip;
  });
};

export const getWeekdays = (dates: LogDate[]): string[] => {
  return dates.map((date) => weekdays[date.date.getDay()]);
};
