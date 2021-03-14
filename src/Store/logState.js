import { writable } from 'svelte/store';

let logData = writable([]);

const logStore = {
  subscribe: logData.subscribe,

  setLogData: (logs) => {
    logData.set(logs);
  },

  addLogDate: (date) => {
    const newLogDate = {
      ...date,
    };
    logData.update((days) => {
      return [...days, newLogDate];
    });
  },

  updateLogDate: (id, date) => {
    logData.update((days) => {
      const dateIndex = days.findIndex((i) => i.id === id);
      const updatedLogDate = { ...logData[dateIndex], ...date };
      const updatedLogDates = [...days];
      updatedLogDates[dateIndex] = updatedLogDate;
      return updatedLogDates;
    });
  },

  removeLogDate: (id) => {
    logData.update((days) => {
      return days.filter((day) => day.id !== id);
    });
  },
};

export default logStore;
