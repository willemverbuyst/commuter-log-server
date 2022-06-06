import { testLogDateArrayTwoWeeks } from '../../TestData/dummyData';
import { getPartitionData, getPartition } from './partitionChart';

describe('if getPartitionData is given an array of logDates', () => {
  const testPartition = [1, 6, 1];
  const testLabels = ['home', 'car', 'public transport'];
  const testTitle = `DAYS WORKING FORM HOME / TRAVELLED BY CAR / TRAVELLED BY PUBLIC TRANSPORT`;

  test('returns object with right properties', () => {
    expect(getPartitionData(testLogDateArrayTwoWeeks).partition).toEqual(
      testPartition
    );
    expect(getPartitionData(testLogDateArrayTwoWeeks).title).toEqual(testTitle);
    expect(getPartitionData(testLogDateArrayTwoWeeks).labels).toEqual(
      testLabels
    );

    expect(getPartitionData(testLogDateArrayTwoWeeks)).toEqual({
      partition: testPartition,
      labels: testLabels,
      title: testTitle,
    });
  });
});

describe('if getPartition is given an array of logDates', () => {
  const testPartition = [1, 6, 1];

  test('returns array with numbers', () => {
    expect(getPartition(testLogDateArrayTwoWeeks)).toEqual(testPartition);
  });
});
