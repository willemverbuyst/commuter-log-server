// CHART COLORS
document.documentElement.style.setProperty(
  '--travelByCar',
  'rgba(255, 159, 64, 0.8)'
);
document.documentElement.style.setProperty(
  '--travelByPublicTransport',
  'rgba(255, 99, 132, 0.8)'
);
document.documentElement.style.setProperty(
  '--workingFromHome',
  'rgba(255, 39, 204, 0.8)'
);
export const travelByCarColor = document.documentElement.style.getPropertyValue(
  '--travelByCar'
);
export const travelByPublicTransportColor = document.documentElement.style.getPropertyValue(
  '--travelByPublicTransport'
);
export const workingFromHomeColor = document.documentElement.style.getPropertyValue(
  '--workingFromHome'
);

// BUTTON COLORS
document.documentElement.style.setProperty('--buttonMain', '#170a3a');

export const setColors = (darkMode) => {
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
