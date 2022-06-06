import {
  colorTravelByCar,
  colorTravelByPublicTransport,
} from '../../UI/colors';
import { getBackgroundColor, getMinutes, getWeekdays } from './chartLogic';
import {
  testLogDateOneA,
  testLogDateTwo,
  testLogDateThree,
  testLogDateFour,
  testLogDateNine,
} from '../../TestData/dummyData';

describe('if getBackgroundColor is given an array of logDates', () => {
  test('returns a the corresponding background colors', () => {
    expect(getBackgroundColor([testLogDateOneA])).toEqual([colorTravelByCar]);
    expect(getBackgroundColor([testLogDateFour])).toEqual([
      colorTravelByPublicTransport,
    ]);
    expect(getBackgroundColor([testLogDateOneA, testLogDateFour])).toEqual([
      colorTravelByCar,
      colorTravelByPublicTransport,
    ]);
  });
});

describe('if getMinutes is given an array of logDates', () => {
  test('returns a the array with minutes', () => {
    expect(getMinutes([testLogDateOneA])).toEqual([90]);
    expect(getMinutes([testLogDateTwo])).toEqual([30]);
    expect(getMinutes([testLogDateNine])).toEqual([0.00001]);
    expect(getMinutes([testLogDateNine])).not.toEqual([0.0001]);
    expect(getMinutes([testLogDateOneA, testLogDateTwo])).toEqual([90, 30]);
    expect(
      getMinutes([testLogDateOneA, testLogDateTwo, testLogDateNine])
    ).toEqual([90, 30, 0.00001]);
  });
});

describe('if getWeekdays is given an array of logDates', () => {
  test('returns a the array with weekdays', () => {
    expect(getWeekdays([testLogDateOneA])).toEqual(['Monday']);
    expect(getWeekdays([testLogDateTwo])).toEqual(['Tuesday']);
    expect(getWeekdays([testLogDateThree])).toEqual(['Wednesday']);
    expect(getWeekdays([testLogDateThree])).not.toEqual(['Friday']);
    expect(getWeekdays([testLogDateOneA, testLogDateTwo])).toEqual([
      'Monday',
      'Tuesday',
    ]);
    expect(
      getWeekdays([testLogDateOneA, testLogDateTwo, testLogDateThree])
    ).toEqual(['Monday', 'Tuesday', 'Wednesday']);
  });
});
