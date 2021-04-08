import type { LogDate } from '../models/Logdata';

// Chunks the array of daysm (arr) into arrays of 5 (size) - working days
export const chunkArray = (arr: LogDate[], size: number): LogDate[][] => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};

export const getUniqueValues = (
  value: string | number,
  index: number,
  self: Array<string | number>
): boolean => self.indexOf(value) === index;

// TO DO: REFACTOR???
export const reduceDates = (dates: LogDate[]): LogDate[] => {
  let container: { [key: string]: LogDate } = {};

  dates.forEach(function (d) {
    let adjustedDate = String(d.date).slice(0, 15);
    if (container.hasOwnProperty(adjustedDate)) {
      container[adjustedDate] = {
        ...d,
        durationTrip: container[adjustedDate].durationTrip + d.durationTrip,
      };
    } else {
      container[adjustedDate] = { ...d };
    }
  });

  let reducedDates = [];

  for (let prop in container) {
    reducedDates.push(container[prop]);
  }

  return reducedDates;
};
