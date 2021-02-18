export function isEmpty(val) {
  return val.trim().length === 0;
}

export function checkCostsInput(val) {
  return /^\d{1,4},\d{2}$/.test(val);
}

export function checkDurationInput(val) {
  return /^\d{2}:\d{2}$/.test(val);
}
