export const getUniqueValues = (value, index, self) =>
  self.indexOf(value) === index;

export const groupByWeekNumber = (logData) => {
  const groups = Object.values(
    logData.reduce((a, b) => {
      a[b.weekNumber] = a[b.weekNumber] || [];
      a[b.weekNumber].push(b);
      return a;
    }, [])
  );
  const groupsOrderedByDate = [...groups].sort(
    (a, b) => new Date(a[0].date).getTime() - new Date(b[0].date).getTime()
  );

  return groupsOrderedByDate;
};

export const reduceDates = (dates) => {
  let container = {};

  dates.forEach((date) => {
    // Get the date without timestamp
    let adjustedDate = String(date.date).slice(0, 15);

    if (
      date.statusOfDay === 'WORKING_AT_THE_OFFICE' &&
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
  function hasOwnProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
  }

  let reducedDates = [];

  for (let checkedDate in container) {
    reducedDates.push(container[checkedDate]);
  }

  return reducedDates;
};
