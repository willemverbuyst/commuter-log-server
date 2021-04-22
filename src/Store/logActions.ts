import type { LogDate } from '../models/Logdata';
import logData from './logState';
import { isLoadingStore } from './appState';
import firebase from 'firebase/app';
import 'firebase/database';
import logStore from './logState';
import { sortByDateAscending } from '../Helpers/dateLogic';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async (): Promise<void> => {
  console.log('fetching logData');
  try {
    const db = firebase.database();
    const ref = db.ref('/logdata');

    ref.once('value', function (snapshot) {
      const data = snapshot.val();
      const loadedLogData: LogDate[] = [];

      for (const key in data) {
        loadedLogData.push({
          ...data[key],
          id: key,
          date: new Date(data[key].date),
        });
      }
      const sortedLogData = sortByDateAscending([...loadedLogData]);

      setTimeout(() => {
        updateIsLoading();
        logData.setLogData(loadedLogData);
        console.log(loadedLogData);
        console.log(sortedLogData);
      }, 1000);
    });
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
};

export const postNewLogData = async (logDate: LogDate): Promise<void> => {
  console.log('posting logData');
  updateIsLoading();
  try {
    const db = firebase.database();
    const ref = db.ref('/logdata');

    setTimeout(() => {
      ref.push(logDate);
      logStore.addLogDate(logDate);
    }, 1000);
    updateIsLoading();
  } catch (error) {
    console.log(error);
    updateIsLoading();
  }
};

export const updateLogData = async (
  id: string,
  logDate: LogDate
): Promise<void> => {
  console.log('upating logData');
  updateIsLoading();
  try {
    const db = firebase.database();
    const ref = db.ref(`/logdata/${id}`);

    setTimeout(() => {
      ref.update(logDate);
      logStore.updateLogDate(id, logDate);
    }, 1000);
    updateIsLoading();
  } catch (error) {
    console.log(error);
    updateIsLoading();
  }
};
