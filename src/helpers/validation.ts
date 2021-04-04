export function isEmpty(val: string): boolean {
  const inputIsEmpty: boolean = val.trim().length === 0;
  return inputIsEmpty;
}

export function checkDurationInput(val: string): boolean {
  const minutes: string = val.split(':')[1];
  if (Number(minutes) >= 60) return false;
  return /^\d{2}:\d{2}$/.test(val);
}
