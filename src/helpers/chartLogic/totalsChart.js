import { chunkArray, getWeekNumber } from './chartLogic';
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
  const weekWithoutDaysOff = week.filter(
    (day) => day.durationTripOne !== 99999
  );

  const totalPerWeekCar = getTotalPerWeekForCar(weekWithoutDaysOff);
  const totalPerWeekPublicTransport = getTotalPerWeekForPublicTransport(
    weekWithoutDaysOff
  );

  return { totalPerWeekCar, totalPerWeekPublicTransport };
};

export const getTotalPerWeekForCar = (week) => {
  const travelledByCar = week.filter((day) => day.meansOfTransport === 'car');
  const totalPerWeekForCar =
    travelledByCar.length > 0
      ? travelledByCar
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return totalPerWeekForCar;
};

export const getTotalPerWeekForPublicTransport = (week) => {
  const travelledByPublicTransport = week.filter(
    (day) => day.meansOfTransport === 'public transport'
  );
  const totalPerWeekForPublicTransport =
    travelledByPublicTransport.length > 0
      ? travelledByPublicTransport
          .map((day) => day.durationTripOne + day.durationTripTwo)
          .reduce((a, b) => a + b)
      : 0;

  return totalPerWeekForPublicTransport;
};
