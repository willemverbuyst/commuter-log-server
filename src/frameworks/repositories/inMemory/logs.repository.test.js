const Chance = require('chance');
const { cloneDeep } = require('lodash');
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
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    });
    const shouldStayLog = new Log({
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
  // test('User should be updated', async () => {
  //   // add a user
  //   const testUser = new User({
  //     name: chance.name(),
  //     lastName: chance.last(),
  //     gender: genders.FEMALE,
  //     meta: { hair: { color: 'Black' } },
  //   });
  //   const addedUser = await usersRepository.add(testUser);
  //   expect(addedUser).toBeDefined();

  //   // update a user
  //   const clonedUser = cloneDeep({
  //     ...addedUser,
  //     name: chance.name(),
  //     gender: genders.MALE,
  //   });
  //   const updatedUser = await usersRepository.update(clonedUser);
  //   expect(updatedUser).toEqual(clonedUser);
  // });
});
