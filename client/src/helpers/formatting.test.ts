import { formatDuration, formatTimeInput } from './formatting';

describe('if formatDuration is given a number', () => {
  test('returns a string', () => {
    expect(formatDuration(0.00001)).toBe('day off');
    expect(formatDuration(0.0001)).not.toBe('day off');
    expect(formatDuration(1)).toBe('00:01');
    expect(formatDuration(59)).toBe('00:59');
    expect(formatDuration(60)).toBe('01:00');
    expect(formatDuration(61)).toBe('01:01');
    expect(formatDuration(70)).toBe('01:10');
    expect(formatDuration(120)).toBe('02:00');
    expect(formatDuration(600)).toBe('10:00');
  });
});

describe('if formatInput is given a string', () => {
  test('returns a number', () => {
    expect(formatTimeInput('00:01')).toBe(1);
    expect(formatTimeInput('00:59')).toBe(59);
    expect(formatTimeInput('01:00')).toBe(60);
    expect(formatTimeInput('01:01')).toBe(61);
    expect(formatTimeInput('01:10')).toBe(70);
    expect(formatTimeInput('02:00')).toBe(120);
    expect(formatTimeInput('10:00')).toBe(600);
  });
});
