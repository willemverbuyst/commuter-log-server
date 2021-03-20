// Chunks the array of daysm (arr) into arrays of 5 (size) - working days
export const chunkArray = (arr, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};

export const reduceDates = (dates) => {
  let container = {};

  dates.forEach(function (d) {
    if (container.hasOwnProperty(d.date)) {
      container[d.date] = {
        ...d,
        durationTrip: container[d.date].durationTrip + d.durationTrip,
      };
    } else {
      container[d.date] = { ...d };
    }
  });

  let reducedDates = [];

  for (let prop in container) {
    reducedDates.push(container[prop]);
  }

  return reducedDates;
};
