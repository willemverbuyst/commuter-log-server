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
    date.meansOfTransport === 'car' ? '#e20074' : '#3aa'
  );
};

export const getMinutes = (dates) => {
  return dates.map((date) => date.minutes);
};

export const getWeekdays = (dates) => {
  return dates.map((date) => weekdays[date.date.getDay()]);
};
