import { writable, Writable } from 'svelte/store';
import { sortByDateAscending } from '../Helpers/dateLogic';
import type { LogDate } from '../models/Logdata';

let logData: Writable<LogDate[]> = writable([]);

const logStore = {
  subscribe: logData.subscribe,

  setLogData: (logs: LogDate[]) => {
    logData.set(sortByDateAscending([...logs]));
  },

  addLogDate: (date: LogDate) => {
    const newLogDate: LogDate = {
      ...date,
    };
    logData.update((days: LogDate[]) => {
      return sortByDateAscending([...days, newLogDate]);
    });
  },

  updateLogDate: (id: string, date: LogDate) => {
    logData.update((days) => {
      const dateIndex: number = days.findIndex((i) => i.id === id);
      const updatedLogDate = { ...days[dateIndex], ...date };
      const updatedLogDates = [...days];
      updatedLogDates[dateIndex] = updatedLogDate;
      return sortByDateAscending([...updatedLogDates]);
    });
  },

  removeLogDate: (id: string) => {
    logData.update((days) => {
      return days.filter((day) => day.id !== id);
    });
  },
};

export default logStore;
