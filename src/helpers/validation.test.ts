import { isEmpty, checkDurationInput } from './validation';

describe('if given string', () => {
  test('returns true if empty', () => {
    expect(isEmpty('hahaha')).toBe(false);
    expect(isEmpty('')).toBe(true);
  });
});

describe('if given string', () => {
  test('returns true if string is in the correct format', () => {
    expect(checkDurationInput('00:65')).toBe(false);
    expect(checkDurationInput('00:5')).toBe(false);
    expect(checkDurationInput('time')).toBe(false);
    expect(checkDurationInput('20')).toBe(false);
    expect(checkDurationInput(':')).toBe(false);
    expect(checkDurationInput('1:15')).toBe(false);
    expect(checkDurationInput('00:00')).toBe(true);
    expect(checkDurationInput('00:10')).toBe(true);
    expect(checkDurationInput('10:10')).toBe(true);
  });
});
