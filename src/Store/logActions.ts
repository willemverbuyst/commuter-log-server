import type { LogDate } from '../models/Logdata';
import logData from './logState';
import { isLoadingStore } from './appState';
import firebase from 'firebase/app';
import 'firebase/database';
import logStore from './logState';
import { logDataSeed } from '../../data/logData';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async (): Promise<void> => {
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

      setTimeout(() => {
        updateIsLoading();
        logData.setLogData(loadedLogData);
      }, 1000);
    });
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
};

export const postNewLogData = async (logDate: LogDate): Promise<void> => {
  try {
    const db = firebase.database();
    const ref = db.ref('/logdata');

    setTimeout(() => {
      updateIsLoading();
      ref.push(logDate);
    }, 1000);
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
  updateIsLoading();
};

export const updateLogData = async (
  id: string,
  logDate: LogDate
): Promise<void> => {
  try {
    const db = firebase.database();
    const ref = db.ref(`/logdata/${id}`);

    setTimeout(() => {
      updateIsLoading();
      ref.update(logDate);
      logStore.updateLogDate(id, logDate);
    }, 1000);
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
  updateIsLoading();
};

// For development, seed database

// export const postLogData = async (): Promise<void> => {
//   try {
//     const db = firebase.database();
//     const ref = db.ref('/logdata');

//     ref.set(logDataSeed);
//     console.log('database seeded');
//   } catch (error) {
//     console.log(error);
//   }
// };
