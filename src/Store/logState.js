import { writable } from 'svelte/store';

let logData = writable([]);

const logStore = {
  subscribe: logData.subscribe,

  setLogData: (logs) => {
    logData.set(logs);
  },
};

export default logStore;
