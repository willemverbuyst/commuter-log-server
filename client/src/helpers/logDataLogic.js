import { getUniqueValues, groupByWeekNumber, reduceDates } from './utils';
import { getWeekNumber, getYear } from './dateLogic';

export const getNumberOfWeeks = (logData) => {
  const reducedDates = reduceDates(logData);
  const numberOfWeeks = groupByWeekNumber(reducedDates);

  return numberOfWeeks.length;
};

export const getUniqueStatuses = (logData) => {
  const statuses = logData.map((date) => date.statusOfDay);

  const uniqueStatuses = statuses.filter(getUniqueValues);
  const sortedUniqueStatus = [...uniqueStatuses].sort();
  return sortedUniqueStatus;
};

export const getUniqueWeekNumbers = (logData) => {
  const weekNumbers = logData.map((date) => date.weekNumber);

  const uniqueWeekNumbers = weekNumbers.filter(getUniqueValues);
  return uniqueWeekNumbers;
};

export const getUniqueYears = (logData) => {
  const years = logData.map((date) => getYear(new Date(date.date)));

  const uniqueYears = years.filter(getUniqueValues);
  return uniqueYears;
};

export const getYearAndWeekNumber = (logData, index) => {
  const reducedDates = reduceDates(logData);
  const week = groupByWeekNumber(reducedDates)[index];
  // Use the first day of the week to get week number and year
  const yearAndWeekNumber = getWeekNumber(new Date(week[0].date));

  return yearAndWeekNumber;
};
