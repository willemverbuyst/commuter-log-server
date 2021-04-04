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

// REMOVE, USE FUNCTION IN FORMATTING
// change the number in minutes to hh:mm
export const formatDataLabels = (value: number): string => {
  if (value === 0.00001) {
    return 'day off';
  } else if (value >= 600 && value % 60 === 0) {
    return `${Math.floor(value / 60)}:00`;
  } else if (value >= 600 && value % 60 !== 0 && value % 60 < 10) {
    return `${Math.floor(value / 60)}:0${Math.floor(value % 60)}`;
  } else if (value >= 600 && value % 60 !== 0) {
    return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
  } else if (value < 600 && value % 60 === 0) {
    return `0${Math.floor(value / 60)}:00`;
  } else if (value < 600 && value % 60 !== 0 && value % 60 < 10) {
    return `0${Math.floor(value / 60)}:0${Math.floor(value % 60)}`;
  } else {
    return `0${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
  }
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
