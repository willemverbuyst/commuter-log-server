export const getBackgroundColor = (dates) => {
  return dates.map((date) =>
    date.meansOfTransport === 'car' ? '#e20074' : '#3aa'
  );
};

export const getMinutes = (dates) => {
  return dates.map((date) => date.minutes);
};
