import logData from './logState';

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
        isLoading = false;
        logData.setLogData(loadedLogData);
      }, 1000);
    })
    .catch((err) => {
      //error = err;
      isLoading = false;
      console.log(err);
    });
