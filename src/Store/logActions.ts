import type { LogDate } from '../models/Logdata';
import logData from './logState';
import { isLoadingStore } from './appState';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = () =>
  // @ts-ignore
  fetch(`${__myapp.env.DATABASE}/logdata.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Fetching logdata failed, please try again!');
      }
      return res.json();
    })
    .then((data) => {
      const loadedLogData: LogDate[] = [];
      for (const key in data) {
        loadedLogData.push({
          ...data[key],
          id: key,
          date: new Date(data[key].date),
        });
      }
      setTimeout(() => {
        updateIsLoading();
        logData.setLogData(loadedLogData);
      }, 1000);
    })
    .catch((err) => {
      //error = err;
      updateIsLoading();
      console.log(err);
    });
