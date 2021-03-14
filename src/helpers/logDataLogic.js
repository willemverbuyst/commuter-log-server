import { chunkArray } from './utils';

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

export const getNumberOfWeeks = (workingDays) => {
  const numberOfWeeks = chunkArray(workingDays, 5);

  return numberOfWeeks.length;
};

export const getYearAndWeekNumber = (logData, index) => {
  const week = chunkArray(logData, 5)[index];
  // Use the first day of the week to get week number and year
  const yearAndWeekNumber = getWeekNumber(week[0].date);

  return yearAndWeekNumber;
};
