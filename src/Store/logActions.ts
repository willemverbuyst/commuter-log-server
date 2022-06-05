import type { LogDate } from '../models/Logdata';
import logData from './logState';
import { isLoadingStore } from './appState';
import logStore from './logState';
// import { logDataSeed } from '../../data/logData';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async (): Promise<void> => {
  try {
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
};

export const postNewLogData = async (logDate: LogDate): Promise<void> => {
  try {
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
