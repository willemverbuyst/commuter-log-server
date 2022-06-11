import { isLoadingStore } from './appState';
import { logStore } from './logState';
// import { logDataSeed } from '../../data/logData';

function updateIsLoading() {
  isLoadingStore.updateIsLoading();
}

export const fetchLogData = async () => {
  // try {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
    .then((response) => response.json())
    .then((data) => {
      console.log('fetch', data);
      logStore.setLogData(data);
      updateIsLoading();
    })
    .catch((error) => {
      console.log(error);
      updateIsLoading();
      return [];
    });
  // } catch (error) {
  //   updateIsLoading();
  //   console.log(error);
  // }
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
