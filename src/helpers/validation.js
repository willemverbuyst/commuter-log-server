export function isEmpty(val) {
  return val.trim().length === 0;
}

export function checkDurationInput(val) {
  return /^\d{2}:\d{2}$/.test(val);
}
