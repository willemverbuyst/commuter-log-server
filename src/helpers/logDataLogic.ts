import type { LogDate } from '../models/Logdata';
import { chunkArray, getUniqueValues, reduceDates } from './utils';
import { getWeekNumber, getYear } from './dateLogic';

export const getNumberOfWeeks = (logData: LogDate[]): number => {
  const reducedDates = reduceDates(logData);
  const numberOfWeeks = chunkArray(reducedDates, 5);

  return numberOfWeeks.length;
};

export const getUniqueStatuses = (logData: LogDate[]): string[] => {
  const statuses = logData.map((date) => date.statusOfDay);

  const uniqueStatuses = statuses.filter(getUniqueValues);
  const sortedUniqueStatus = [...uniqueStatuses].sort();
  return sortedUniqueStatus;
};

export const getUniqueWeekNumbers = (logData: LogDate[]): number[] => {
  const weekNumbers = logData.map((date) => date.weekNumber);

  const uniqueWeekNumbers = weekNumbers.filter(getUniqueValues);
  return uniqueWeekNumbers;
};

export const getUniqueYears = (logData: LogDate[]): string[] => {
  const years = logData.map((date) => getYear(new Date(date.date)));

  const uniqueYears = years.filter(getUniqueValues);
  return uniqueYears;
};

export const getYearAndWeekNumber = (
  logData: LogDate[],
  index: number
): [number, number] => {
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const week = chunkArray<LogDate>(reducedDates, 5)[index];
  // Use the first day of the week to get week number and year
  const yearAndWeekNumber = getWeekNumber(new Date(week[0].date));

  return yearAndWeekNumber;
};
