import type { LogDate } from '../../models/Logdata';
import { getYear } from '../utils';

export const filterData = (
  logData: LogDate[],
  value: string,
  dropdown: string
): LogDate[] | [] => {
  let filteredData;
  switch (dropdown) {
    case 'routeFrom':
      filteredData = logData.filter((date) =>
        value === 'no sorting' ? date : date.routeTripFrom === value
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'routeTo':
      filteredData = logData.filter((date) =>
        value === 'no sorting' ? date : date.routeTripTo === value
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'sortDate':
      filteredData =
        value === 'ascending'
          ? [...logData].sort((a, b) => a.date.getTime() - b.date.getTime())
          : [...logData].sort((a, b) => b.date.getTime() - a.date.getTime());
      return filteredData.length > 0 ? filteredData : [];

    case 'sortTravelTime':
      filteredData =
        value === 'ascending'
          ? [...logData].sort((a, b) => a.durationTrip - b.durationTrip)
          : [...logData].sort((a, b) => b.durationTrip - a.durationTrip);
      return filteredData.length > 0 ? filteredData : [];

    case 'status':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : date.statusOfDay === value
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'week':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : Number(date.weekNumber) === Number(value)
      );
      return filteredData.length > 0 ? filteredData : [];

    case 'year':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : Number(getYear(date.date)) === Number(value)
      );
      return filteredData.length > 0 ? filteredData : [];

    default:
      return logData;
  }
};
