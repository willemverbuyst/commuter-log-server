import type { LogDate } from '../../models/Logdata';
import { getYear } from '../utils';

// TO DO: ADD RETURN TYPE FIX DURATION TRIP (!)
export const filterData = (
  logData: LogDate[],
  value: string,
  dropdown: string
) => {
  let filteredData;
  switch (dropdown) {
    case 'routeFrom':
      filteredData = logData.filter((date) =>
        value === 'no sorting' ? date : date.routeTripFrom === value
      );
      break;

    case 'routeTo':
      filteredData = logData.filter((date) =>
        value === 'no sorting' ? date : date.routeTripTo === value
      );
      break;

    case 'sortDate':
      filteredData =
        value === 'ascending'
          ? [...logData].sort((a, b) => a.date.getTime() - b.date.getTime())
          : [...logData].sort((a, b) => b.date.getTime() - a.date.getTime());
      break;

    case 'sortTravelTime':
      filteredData =
        value === 'ascending'
          ? logData
              .map((date) =>
                date.statusOfDay !== 'working at the office'
                  ? { ...date, durationTrip: 0 }
                  : date
              )
              .sort((a, b) => a.durationTrip! - b.durationTrip!)
          : logData
              .map((date) =>
                date.statusOfDay !== 'working at the office'
                  ? { ...date, durationTrip: 0 }
                  : date
              )
              .sort((a, b) => b.durationTrip! - a.durationTrip!);
      break;
    case 'status':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : date.statusOfDay === value
      );
      break;

    case 'week':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : Number(date.weekNumber) === Number(value)
      );
      break;

    case 'year':
      filteredData = logData.filter((date) =>
        value === 'all' ? date : Number(getYear(date.date)) === Number(value)
      );
      break;

    default:
      logData;
  }
  return filteredData;
};
