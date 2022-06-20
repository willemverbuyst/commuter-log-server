import { isLoadingStore } from './appState';
import { logStore } from './logState';
// import { logDataSeed } from '../../data/logData';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async () => {
  // try {
  fetch('http://localhost:4000/api/v1/logs')
    .then((response) => response.json())
    .then((data) => {
      console.log('fetch', data);
      logStore.setLogData(data.content);
      updateIsLoading();
    })
    .catch((error) => {
      console.log(error);
      updateIsLoading();
      return [];
    });
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
