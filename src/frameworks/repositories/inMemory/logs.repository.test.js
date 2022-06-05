const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { logsRepository } = require('.');
const {
  Log,
  constants: {
    logConstants: { meansOfTransport, statusOfDay },
  },
} = require('../../../entities');

const chance = new Chance();

describe('Logs repository', () => {
  test('New log should be added and returned', async () => {
    const testLog = new Log({
      userId: uuidv4(),
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    });

    const addedLog = await logsRepository.add(testLog);

    expect(addedLog).toBeDefined();
    expect(addedLog.id).toBeDefined();
    expect(addedLog.userId).toBe(testLog.userId);
    expect(addedLog.date).toBe(testLog.date);
    expect(addedLog.statusOfDay).toBe(testLog.statusOfDay);
    expect(addedLog.durationTrip).toBe(testLog.durationTrip);
    expect(addedLog.meansOfTransport).toBe(testLog.meansOfTransport);
    expect(addedLog.startingPoint).toBe(testLog.startingPoint);
    expect(addedLog.destination).toBe(testLog.destination);
    expect(addedLog.meta).toEqual(testLog.meta);

    const returnedLog = await logsRepository.getById(addedLog.id);
    expect(returnedLog).toEqual(addedLog);
  });
  test('Log should be deleted', async () => {
    // init two logs
    const willBeDeletedLog = new Log({
      userId: uuidv4(),
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    });
    const shouldStayLog = new Log({
      userId: uuidv4(),
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    });
    // add two logs
    const [willBeDeletedAddedLog, shouldStayAddedLog] = await Promise.all([
      logsRepository.add(willBeDeletedLog),
      logsRepository.add(shouldStayLog),
    ]);
    expect(willBeDeletedAddedLog).toBeDefined();
    expect(shouldStayAddedLog).toBeDefined();
    // delete one log
    const deletedLog = await logsRepository.delete(willBeDeletedAddedLog);
    expect(deletedLog).toEqual(willBeDeletedAddedLog);
    // try to get deleted log - should be undefined
    const shouldBeUndefinedLog = await logsRepository.getById(deletedLog.id);
    expect(shouldBeUndefinedLog).toBeUndefined();
    // check if the second log is not deleted - is defined
    const shouldBeDefinedLog = await logsRepository.getById(
      shouldStayAddedLog.id,
    );
    expect(shouldBeDefinedLog).toBeDefined();
  });
  test('Log should be updated', async () => {
    // add a log
    const testLog = new Log({
      userId: uuidv4(),
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    });
    const addedLog = await logsRepository.add(testLog);
    expect(addedLog).toBeDefined();

    // update a log
    const clonedLog = cloneDeep({
      ...addedLog,
      meansOfTransport: meansOfTransport.PUBLIC_TRANSPORT,
    });
    const updatedLog = await logsRepository.update(clonedLog);
    expect(updatedLog).toEqual(clonedLog);
  });
});
