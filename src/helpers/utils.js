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

export const getUniqueValues = (value, index, self) =>
  self.indexOf(value) === index;

export const reduceDates = (dates) => {
  let container = {};

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

export const getYear = (date) => date.toString().slice(11, 15);
