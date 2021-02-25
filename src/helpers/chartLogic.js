import {
  travelByCarColor,
  travelByPublicTransportColor,
  workingFromHomeColor,
} from '../UI/Colors';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getBackgroundColor = (dates) => {
  return dates.map((date) =>
    date.meansOfTransport === 'car'
      ? travelByCarColor
      : travelByPublicTransportColor
  );
};

// change the number in minutes to hh:mm
export const formatDataLabels = (value) => {
  if (value === 0.00001) {
    return 'day off';
  } else if (value >= 600 && value % 60 === 0) {
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

const getMinutes = (dates) => {
  return dates.map((date) => {
    return date.durationTripOne === 99999
      ? 0.00001
      : date.durationTripOne + date.durationTripTwo;
  });
};

const getWeekdays = (dates) => {
  return dates.map((date) => weekdays[date.date.getDay()]);
};

// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
const getWeekNumber = (day) => {
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
  const title = `TRAVEL TIMES WEEK ${getWeekNumber(week[0].date)[1]}`;

  return {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  };
};

const getAveragesPerWeek = (weeks) => {
  const averagesPerWeek = weeks.map((week) => getAveragePerWeek(week));
  const averagesPerWeekCar = averagesPerWeek.map(
    (week) => week.averagePerWeekCar
  );
  const averagesPersWeekPublicTransport = averagesPerWeek.map(
    (week) => week.averagePerWeekPublicTransport
  );

  return { averagesPerWeekCar, averagesPersWeekPublicTransport };
};

const getAveragePerWeek = (week) => {
  const weekWithoutDayOff = week.filter((day) => day.durationTripOne !== 99999);
  const totalMinutesPerWeekCar = weekWithoutDayOff
    .filter((day) => day.meansOfTransport === 'car')
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);
  const totalMinutesPerWeekPublicTransport = weekWithoutDayOff
    .filter((day) => day.meansOfTransport === 'public transport')
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);

  const averagePerWeekCar = totalMinutesPerWeekCar / weekWithoutDayOff.length;
  const averagePerWeekPublicTransport =
    totalMinutesPerWeekPublicTransport / weekWithoutDayOff.length;

  return { averagePerWeekCar, averagePerWeekPublicTransport };
};

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};

export const getAveragePerWeekData = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);

  const averages = getAveragesPerWeek(weeks);
  const backgroundColorCar = [1, 2, 3, 4].map(() => travelByCarColor);
  const backgroundColorPublicTransport = [1, 2, 3, 4].map(
    () => travelByPublicTransportColor
  );

  const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
  // const maxForDisplay = Math.max(...averages) * 1.2;
  const title = `AVERAGE TRAVEL TIMES PER WEEK`;

  return {
    averages,
    backgroundColorCar,
    backgroundColorPublicTransport,
    labels,
    // maxForDisplay: 20,
    title,
  };
};

const getTransportPartition = (workingDays) => {
  const workingFromHome = workingDays.filter(
    (day) => day.workingFromHome === true
  ).length;
  const travelledByCar = workingDays.filter(
    (day) => day.meansOfTransport === 'car'
  ).length;
  const travelledByTrain = workingDays.filter(
    (day) => day.meansOfTransport === 'public transport'
  ).length;

  return [workingFromHome, travelledByCar, travelledByTrain];
};

export const getTransportPartitionData = (workingDays) => {
  const partition = getTransportPartition(workingDays);
  const backgroundColor = [
    workingFromHomeColor,
    travelByCarColor,
    travelByPublicTransportColor,
  ];
  const labels = ['wfh', 'car', 'public transport'];
  const title = `PIE`;

  return {
    partition,
    backgroundColor,
    labels,
    title,
  };
};

const getCarTotals = (workingDays) => {
  const daysTravelledByCar = workingDays.filter(
    (day) => day.meansOfTransport === 'car' && day.durationTripOne !== 99999
  );
  const numberOfDaystravelledByCar = daysTravelledByCar.length;
  const totalTimeTravelledByCar = daysTravelledByCar
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);

  return {
    numberOfDaystravelledByCar,
    totalTimeTravelledByCar,
  };
};

const getPublicTransportTotals = (workingDays) => {
  const daysTravelledByPublicTransport = workingDays.filter(
    (day) =>
      day.meansOfTransport === 'public transport' &&
      day.durationTripOne !== 99999
  );
  const numberOfDaysTravelledByublicTransport =
    daysTravelledByPublicTransport.length;
  const totalTimeTravelledByPublicTransport = daysTravelledByPublicTransport
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);

  return {
    numberOfDaysTravelledByublicTransport,
    totalTimeTravelledByPublicTransport,
  };
};

export const getCarAndPublicTransortData = (workingDays) => {
  const carTotals = getCarTotals(workingDays);
  const publicTransportTotals = getPublicTransportTotals(workingDays);
  const totals = [
    carTotals.totalTimeTravelledByCar,
    publicTransportTotals.totalTimeTravelledByPublicTransport,
  ];
  const labels = ['Car', 'Public Transport'];
  const maxForDisplay = Math.max(...totals) * 1.2;
  const title = 'Car vs Public Transport';
  const backgroundColor = [travelByCarColor, travelByPublicTransportColor];

  return { totals, labels, backgroundColor, maxForDisplay, title };
};

export const getAllWorkingDaysData = (workingDays) => {
  const withoutDayOff = workingDays.filter(
    (day) => day.durationTripOne !== 99999
  );
  const travelTimes = withoutDayOff.map(
    (day) => day.durationTripOne + day.durationTripTwo
  );
  const backgroundColor = travelTimes.map(() => travelByCarColor);

  const labels = withoutDayOff.map((day) => day.date.toString().slice(0, 3));
  const maxForDisplay = Math.max(...travelTimes) * 1.2;
  const title = `TRAVEL TIMES`;
  const lineValue = withoutDayOff.map(
    () => travelTimes.reduce((a, b) => a + b) / travelTimes.length
  );

  return {
    travelTimes,
    backgroundColor,
    maxForDisplay,
    labels,
    title,
    lineValue,
  };
};

const getTotalsPerWeek = (weeks) => {
  const totalsPerWeek = weeks.map((week) => getTotalPerWeek(week));
  const totalsPerWeekCar = totalsPerWeek.map((week) => week.totalPerWeekCar);
  const totalsPersWeekPublicTransport = totalsPerWeek.map(
    (week) => week.totalPerWeekPublicTransport
  );

  return { totalsPerWeekCar, totalsPersWeekPublicTransport };
};

const getTotalPerWeek = (week) => {
  const weekWithoutDayOff = week.filter((day) => day.durationTripOne !== 99999);
  const totalPerWeekCar = weekWithoutDayOff
    .filter((day) => day.meansOfTransport === 'car')
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);
  const totalPerWeekPublicTransport = weekWithoutDayOff
    .filter((day) => day.meansOfTransport === 'public transport')
    .map((day) => day.durationTripOne + day.durationTripTwo)
    .reduce((a, b) => a + b);

  return { totalPerWeekCar, totalPerWeekPublicTransport };
};

export const getTotalsPerWeekData = (workingDays) => {
  const weeks = chunkArray(workingDays, 5);

  const totals = getTotalsPerWeek(weeks);
  const backgroundColorCar = totals.totalsPerWeekCar.map(
    () => travelByCarColor
  );
  const backgroundColorPublicTransport = totals.totalsPersWeekPublicTransport.map(
    () => travelByPublicTransportColor
  );

  const labels = weeks.map((a) => `WEEK ${getWeekNumber(a[0].date)[1]}`);
  // const maxForDisplay = Math.max(...averages) * 1.2;
  const title = `TOTAL TRAVEL TIME PER WEEK`;

  return {
    totals,
    backgroundColorCar,
    backgroundColorPublicTransport,
    labels,
    // maxForDisplay: 20,
    title,
  };
};
