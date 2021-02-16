// change the number in minutes to hh:mm
export const formatDataLabels = (value) => {
  if (value >= 600 && value % 60 === 0) {
    return `${Math.floor(value / 60)}:00`;
  } else if (value >= 600 && value % 60 !== 0) {
    return `${Math.floor(value / 60)}:${value % 60}`;
  } else if (value < 600 && value % 60 === 0) {
    return `0${Math.floor(value / 60)}:00`;
  } else {
    return `0${Math.floor(value / 60)}:${value % 60}`;
  }
};
