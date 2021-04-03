import type { LogDate } from '../models/Logdata';
import { chunkArray, getUniqueValues, getYear, reduceDates } from './utils';

export const getNumberOfWeeks = (logData: LogDate[]): number => {
  const reducedDates = reduceDates(logData);
  const numberOfWeeks = chunkArray(reducedDates, 5);

  return numberOfWeeks.length;
};

export const getStatuses = (logData: LogDate[]): string[] => {
  const statuses = logData.map((date) => date.statusOfDay);

  const uniqueStatuses = statuses.filter(getUniqueValues);
  return uniqueStatuses;
};

export const getWeekNumbers = (logData: LogDate[]): number[] => {
  const weekNumbers = logData.map((date) => date.weekNumber);

  const uniqueWeekNumbers = weekNumbers.filter(getUniqueValues);
  return uniqueWeekNumbers;
};

// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
export const getWeekNumber = (day: Date): [number, number] => {
  // Copy date so don't modify original
  const d = new Date(
    Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((Number(d) - Number(yearStart)) / 86400000 + 1) / 7
  );
  // Return array of year and week number
  return [d.getFullYear(), weekNo];
};

export const getYearAndWeekNumber = (
  logData: LogDate[],
  index: number
): [number, number] => {
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const week = chunkArray(reducedDates, 5)[index];
  // Use the first day of the week to get week number and year
  const yearAndWeekNumber = getWeekNumber(week[0].date);

  return yearAndWeekNumber;
};

export const getYears = (logData: LogDate[]): string[] => {
  const years = logData.map((date) => getYear(date.date));

  const uniqueYears = years.filter(getUniqueValues);
  return uniqueYears;
};
