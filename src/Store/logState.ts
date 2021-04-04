import { writable, Writable } from 'svelte/store';
import type { LogDate } from '../models/Logdata';

let logData: Writable<LogDate[]> = writable([]);

const logStore = {
  subscribe: logData.subscribe,

  setLogData: (logs: LogDate[]) => {
    logData.set(logs);
  },

  addLogDate: (date: LogDate) => {
    const newLogDate: LogDate = {
      ...date,
    };
    logData.update((days: LogDate[]) => {
      return [...days, newLogDate];
    });
  },

  updateLogDate: (id: string, date: LogDate) => {
    logData.update((days) => {
      const dateIndex: number = days.findIndex((i) => i.id === id);
      const updatedLogDate = { ...days[dateIndex], ...date };
      const updatedLogDates = [...days];
      updatedLogDates[dateIndex] = updatedLogDate;
      return updatedLogDates;
    });
  },

  removeLogDate: (id: string) => {
    logData.update((days) => {
      return days.filter((day) => day.id !== id);
    });
  },
};

export default logStore;
