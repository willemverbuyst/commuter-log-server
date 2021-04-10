import type { LogDate } from '../models/Logdata';

// Chunks the array of days (arr) into arrays of 5 (size) - working days
export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};

export const getUniqueValues = <T>(
  value: T,
  index: number,
  self: T[]
): boolean => self.indexOf(value) === index;

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
