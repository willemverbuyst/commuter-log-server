export function isEmpty(val) {
  const inputIsEmpty = val.trim().length === 0;
  return inputIsEmpty;
}

export function checkDurationInput(val) {
  const minutes = val.split(':')[1];
  if (Number(minutes) >= 60) return false;
  return /^\d{2}:\d{2}$/.test(val);
}
