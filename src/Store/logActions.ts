import type { LogDate } from '../models/Logdata';
import logData from './logState';
import { isLoadingStore } from './appState';
import firebase from 'firebase/app';
import 'firebase/database';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async () => {
  try {
    const db = firebase.database();
    const ref = db.ref('/logdata');

    ref.once('value', function (snapshot) {
      const data = snapshot.val();
      // console.log(data);
      const loadedLogData: LogDate[] = [];
      for (const key in data) {
        // console.log(key);
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
