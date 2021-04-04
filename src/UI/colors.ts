// CHART COLORS
document.documentElement.style.setProperty(
  '--chart-travel-car',
  'rgba(0, 107, 151, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-publicTransport',
  'rgba(0, 187, 178, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-workingFromHome',
  'rgba(17, 77, 108, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-normal',
  'rgba(255, 159, 64, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-maps',
  'rgba(255, 99, 132, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-extra',
  'rgba(255, 39, 204, 1)'
);

document.documentElement.style.setProperty(
  '--chart-travel-average',
  'rgba(21, 211, 211, 1)'
);

document.documentElement.style.setProperty('--chart-title', '#aaa');

document.documentElement.style.setProperty(
  '--chart-grid',
  'rgba(170, 170, 170, 0.3)'
);

document.documentElement.style.setProperty('--chart-datalabels', '#fff');

export const colorTravelByCar = document.documentElement.style.getPropertyValue(
  '--chart-travel-car'
);
export const colorTravelByPublicTransport = document.documentElement.style.getPropertyValue(
  '--chart-travel-publicTransport'
);
export const colorWorkingFromHomeColor = document.documentElement.style.getPropertyValue(
  '--chart-travel-workingFromHome'
);
export const colorTravelTimeNormal = document.documentElement.style.getPropertyValue(
  '--chart-travel-normal'
);
export const colorTravelTimeMaps = document.documentElement.style.getPropertyValue(
  '--chart-travel-maps'
);
export const colorTravelTimeExtra = document.documentElement.style.getPropertyValue(
  '--chart-travel-extra'
);
export const colorTravelTimeAverage = document.documentElement.style.getPropertyValue(
  '--chart-travel-average'
);
export const colorTitle = document.documentElement.style.getPropertyValue(
  '--chart-title'
);
export const colorGrid = document.documentElement.style.getPropertyValue(
  '--chart-grid'
);
export const colorDatalabels = document.documentElement.style.getPropertyValue(
  '--chart-datalabels'
);

// BUTTON COLORS
document.documentElement.style.setProperty('--buttonMain', '#170a3a');

export const setColors = (darkMode: boolean): void => {
  let root = document.documentElement;

  if (darkMode) {
    root.style.setProperty('--main-bg-color', '#333');
    root.style.setProperty('--main-bg-color-light', '#444');
    root.style.setProperty('--main-bg-color-dark', '#222');
    root.style.setProperty('--main-bg-color-darker', '#111');
    root.style.setProperty('--main-txt-color', '#aaa');
  } else {
    root.style.setProperty('--main-bg-color', '#eee');
    root.style.setProperty('--main-bg-color-light', '#fff');
    root.style.setProperty('--main-bg-color-dark', '#ddd');
    root.style.setProperty('--main-bg-color-darker', '#ccc');
    root.style.setProperty('--main-txt-color', '#aaa');
  }
};
