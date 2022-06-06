import logData from './logState';
import { isLoadingStore } from './appState';
import logStore from './logState';
// import { logDataSeed } from '../../data/logData';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async () => {
  try {
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
};

export const postNewLogData = async (logDate) => {
  try {
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
  updateIsLoading();
};

export const updateLogData = async (id, logDate) => {
  try {
  } catch (error) {
    updateIsLoading();
    console.log(error);
  }
  updateIsLoading();
};
