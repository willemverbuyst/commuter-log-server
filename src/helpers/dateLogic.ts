export const getDay = (date: Date): string => date.toString().slice(0, 10);

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

export const getYear = (date: Date): string => date.toString().slice(11, 15);

export const addOneHour = (date: Date): Date =>
  new Date(date.setHours(date.getHours() + 1));
