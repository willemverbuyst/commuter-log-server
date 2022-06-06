import { writable } from 'svelte/store';
import { sortByDateAscending } from '../helpers/dateLogic';

let logData = writable([]);

const logStore = {
  subscribe: logData.subscribe,

  setLogData: (logs) => {
    logData.set(sortByDateAscending([...logs]));
  },

  addLogDate: (date) => {
    const newLogDate = {
      ...date,
    };
    logData.update((days) => {
      return sortByDateAscending([...days, newLogDate]);
    });
  },

  updateLogDate: (id, date) => {
    logData.update((days) => {
      const dateIndex = days.findIndex((i) => i.id === id);
      const updatedLogDate = { ...days[dateIndex], ...date };
      const updatedLogDates = [...days];
      updatedLogDates[dateIndex] = updatedLogDate;
      return sortByDateAscending([...updatedLogDates]);
    });
  },

  removeLogDate: (id) => {
    logData.update((days) => {
      return days.filter((day) => day.id !== id);
    });
  },
};

export default logStore;
