import { getWeekNumber } from './chartLogic';
import { chunkArray } from './utils';
import {
  travelByCarColor,
  travelByPublicTransportColor,
} from '../../UI/Colors';

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
  const totalCarAndPublicTransport = totals.totalsPerWeekCar.map(
    (day, i) => day + totals.totalsPersWeekPublicTransport[i]
  );
  const maxForDisplay = Math.max(...totalCarAndPublicTransport) * 1.2;
  const title = `TOTAL TRAVEL TIME PER WEEK`;

  return {
    totals,
    backgroundColorCar,
    backgroundColorPublicTransport,
    labels,
    maxForDisplay,
    title,
    totalCarAndPublicTransport,
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
  const weekWithoutDaysOff = week.filter((day) => !day.holiday);

  const totalPerWeekCar = getTotalPerWeekForTransport(
    weekWithoutDaysOff,
    'car'
  );
  const totalPerWeekPublicTransport = getTotalPerWeekForTransport(
    weekWithoutDaysOff,
    'public transport'
  );

  return { totalPerWeekCar, totalPerWeekPublicTransport };
};

export const getTotalPerWeekForTransport = (week, transport) => {
  const travelledByCar = week.filter(
    (day) => day.meansOfTransport === transport
  );
  const totalPerWeekForTransport =
    travelledByCar.length > 0
      ? travelledByCar
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return totalPerWeekForTransport;
};

export const getCarVsPublicTransportTotalsData = (workingDays) => {
  const carTotals = getTotalsTransport(workingDays, 'car');
  const publicTransportTotals = getTotalsTransport(
    workingDays,
    'public transport'
  );
  const totals = [
    carTotals.totalTimeTravelled,
    publicTransportTotals.totalTimeTravelled,
  ];
  const labels = ['Car', 'Public Transport'];
  const maxForDisplay = Math.max(...totals) * 1.2;
  const title = 'TOTAL TIMES CAR VS PUBLIC TRANSPORT';
  const backgroundColor = [travelByCarColor, travelByPublicTransportColor];

  return { totals, labels, backgroundColor, maxForDisplay, title };
};

const getTotalsTransport = (workingDays, transport) => {
  const daysTravelled = workingDays.filter(
    (day) => !day.workingFromHome && day.meansOfTransport === transport
  );
  const numberOfDaystravelled = daysTravelled.length;
  const totalTimeTravelled =
    daysTravelled.length > 0
      ? daysTravelled
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return {
    numberOfDaystravelled,
    totalTimeTravelled,
  };
};
