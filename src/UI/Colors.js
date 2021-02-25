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
