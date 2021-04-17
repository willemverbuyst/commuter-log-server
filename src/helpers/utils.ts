import type { LogDate } from '../models/Logdata';

export const getUniqueValues = <T>(
  value: T,
  index: number,
  self: T[]
): boolean => self.indexOf(value) === index;

export const groupByWeekNumber = (logData: LogDate[]) => {
  const groups = Object.values(
    logData.reduce((a: { [key: number]: LogDate[] }, b: LogDate) => {
      a[b.weekNumber] = a[b.weekNumber] || [];
      a[b.weekNumber].push(b);
      return a;
    }, [])
  );
  return groups;
};

export const reduceDates = (dates: LogDate[]): LogDate[] => {
  let container: { [key: string]: LogDate } = {};

  dates.forEach((date) => {
    // Get the date without timestamp
    let adjustedDate = String(date.date).slice(0, 15);

    if (
      date.statusOfDay === 'working at the office' &&
      container.hasOwnProperty(adjustedDate)
    ) {
      let temperoryCopyofObject = container[adjustedDate];

      // Use helper function
      if (hasOwnProperty(temperoryCopyofObject, 'durationTrip')) {
        container[adjustedDate] = {
          ...date,
          durationTrip: temperoryCopyofObject.durationTrip + date.durationTrip,
        };
      }
    } else {
      container[adjustedDate] = { ...date };
    }
  });

  // https://fettblog.eu/typescript-hasownproperty/
  function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
  ): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop);
  }

  let reducedDates = [];

  for (let checkedDate in container) {
    reducedDates.push(container[checkedDate]);
  }

  return reducedDates;
};
