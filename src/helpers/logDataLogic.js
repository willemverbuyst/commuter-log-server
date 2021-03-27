import { chunkArray, getUniqueValues, getYear, reduceDates } from './utils';

export const getNumberOfWeeks = (logData) => {
  const reducedDates = reduceDates(logData);
  const numberOfWeeks = chunkArray(reducedDates, 5);

  return numberOfWeeks.length;
};

export const getStatuses = (logData) => {
  const statuses = logData.map((date) => date.statusOfDay);

  const uniqueStatuses = statuses.filter(getUniqueValues);
  return uniqueStatuses;
};

export const getWeekNumbers = (logData) => {
  const weekNumbers = logData.map((date) => date.weekNumber);

  const uniqueWeekNumbers = weekNumbers.filter(getUniqueValues);
  return uniqueWeekNumbers;
};

export const getWeekForCards = (logData, weekIndexInLogData) => {
  const weeks = chunkArray(logData, 5);
  const week = weeks[weekIndexInLogData];

  return week;
};

// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
export const getWeekNumber = (day) => {
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
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [d.getFullYear(), weekNo];
};

export const getYearAndWeekNumber = (logData, index) => {
  const reducedDates = reduceDates(logData);
  // Get groups of 5
  const week = chunkArray(reducedDates, 5)[index];
  // Use the first day of the week to get week number and year
  const yearAndWeekNumber = getWeekNumber(week[0].date);

  return yearAndWeekNumber;
};

export const getYears = (logData) => {
  const years = logData.map((date) => getYear(date.date));

  const uniqueYears = years.filter(getUniqueValues);
  return uniqueYears;
};
