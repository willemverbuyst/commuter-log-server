import type { LogDate } from '../../models/Logdata';
import {
  getYear,
  sortByDateAscending,
  sortByDateDescending,
} from '../dateLogic';

export const filterData = (
  logData: LogDate[],
  value: string,
  dropdown: string
): LogDate[] | [] => {
  let filteredData: LogDate[];
  const daysOff = logData.flatMap((date) =>
    date.statusOfDay === 'day off' ? [date] : []
  );
  const daysWorkingFromHome = logData.flatMap((date) =>
    date.statusOfDay === 'working from home' ? [date] : []
  );
  const daysWorkingAtTheOffice = logData.flatMap((date) =>
    date.statusOfDay === 'working at the office' ? [date] : []
  );

  switch (dropdown) {
    case 'routeFrom':
      filteredData = daysWorkingAtTheOffice.filter((date) =>
        value === 'no sorting' ? date : date.routeTripFrom === value
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'routeTo':
      filteredData = daysWorkingAtTheOffice.filter((date) =>
        value === 'no sorting' ? date : date.routeTripTo === value
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'sortDate':
      return value === 'ascending'
        ? sortByDateAscending([...logData])
        : sortByDateDescending([...logData]);

    case 'sortTravelTime':
      return daysWorkingAtTheOffice.length < 1
        ? [...daysWorkingFromHome, ...daysOff]
        : value === 'ascending'
        ? [
            ...daysOff,
            ...daysWorkingFromHome,
            ...[...daysWorkingAtTheOffice].sort(
              (a, b) => a.durationTrip - b.durationTrip
            ),
          ]
        : [
            ...[...daysWorkingAtTheOffice].sort(
              (a, b) => b.durationTrip - a.durationTrip
            ),
            ...daysWorkingFromHome,
            ...daysOff,
          ];

    case 'status':
      if (value === 'car' || value === 'public transport') {
        filteredData = daysWorkingAtTheOffice.flatMap((date) =>
          date.meansOfTransport === value ? date : []
        );
      } else {
        filteredData = logData.filter((date) =>
          value === 'all' ? date : date.statusOfDay === value
        );
      }
      return filteredData.length > 0 ? filteredData : [];

    case 'week':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : Number(date.weekNumber) === Number(value)
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'year':
      filteredData = logData.filter((date) =>
        value === 'all'
          ? date
          : Number(getYear(new Date(date.date))) === Number(value)
      );
      return filteredData.length > 0 ? filteredData : [];

    default:
      return logData;
  }
};
