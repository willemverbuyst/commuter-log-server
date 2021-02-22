const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getBackgroundColor = (dates) => {
  return dates.map((date) =>
    date.meansOfTransport === 'car' ? '#1F91AE' : '#392D4D'
  );
};

// change the number in minutes to hh:mm
export const formatDataLabels = (value) => {
  if (value >= 600 && value % 60 === 0) {
    return `${Math.floor(value / 60)}:00`;
  } else if (value >= 600 && value % 60 !== 0) {
    return `${Math.floor(value / 60)}:${value % 60}`;
  } else if (value < 600 && value % 60 === 0) {
    return `0${Math.floor(value / 60)}:00`;
  } else if (value < 600 && value % 60 !== 0 && value % 60 < 10) {
    return `0${Math.floor(value / 60)}:0${value % 60}`;
  } else {
    return `0${Math.floor(value / 60)}:${value % 60}`;
  }
};

export const getMinutes = (dates) => {
  return dates.map((date) => date.durationTripOne + date.durationTripTwo);
};

export const getWeekdays = (dates) => {
  return dates.map((date) => weekdays[date.date.getDay()]);
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

export const getWeekData = (dates, weekNumber) => {
  const week = dates.filter((d) => getWeekNumber(d.date)[1] === weekNumber);
  const travelTimes = getMinutes(week);
  const backgroundColor = getBackgroundColor(week);
  const labels = getWeekdays(week);
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
  const title = `WEEK ${getWeekNumber(week[0].date)[1]}`;

  return {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  };
};
