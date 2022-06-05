// change the number in minutes to hh:mm
export const formatDuration = (value: number): string => {
  if (value === 0.00001) {
    return 'day off';
  } else if (value >= 600 && value % 60 === 0) {
    return `${Math.floor(value / 60)}:00`;
  } else if (value >= 600 && value % 60 !== 0 && value % 60 < 10) {
    return `${Math.floor(value / 60)}:0${Math.floor(value % 60)}`;
  } else if (value >= 600 && value % 60 !== 0) {
    return `${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
  } else if (value < 600 && value % 60 === 0) {
    return `0${Math.floor(value / 60)}:00`;
  } else if (value < 600 && value % 60 !== 0 && value % 60 < 10) {
    return `0${Math.floor(value / 60)}:0${Math.floor(value % 60)}`;
  } else {
    return `0${Math.floor(value / 60)}:${Math.floor(value % 60)}`;
  }
};

export const formatTimeInput = (timeInput: string): number => {
  const [hours, minutes] = timeInput.split(':');
  const totalTimeInMinutes = Number(hours) * 60 + Number(minutes) * 1;

  return totalTimeInMinutes;
};
