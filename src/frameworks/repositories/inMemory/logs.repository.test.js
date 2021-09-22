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
  // test('User should be deleted', async () => {
  //   // init two users
  //   const willBeDeletedUser = new User({
  //     name: chance.name(),
  //     lastName: chance.last(),
  //     gender: genders.FEMALE,
  //     meta: { hair: { color: 'Black' } },
  //   });
  //   const shouldStayUser = new User({
  //     name: chance.name(),
  //     lastName: chance.last(),
  //     gender: genders.FEMALE,
  //     meta: { hair: { color: 'Blond' } },
  //   });
  //   // add two users
  //   const [willBeDeletedAddedUser, shouldStayAddedUser] = await Promise.all([
  //     usersRepository.add(willBeDeletedUser),
  //     usersRepository.add(shouldStayUser),
  //   ]);
  //   expect(willBeDeletedAddedUser).toBeDefined();
  //   expect(shouldStayAddedUser).toBeDefined();
  //   // delete one user
  //   const deletedUser = await usersRepository.delete(willBeDeletedAddedUser);
  //   expect(deletedUser).toEqual(willBeDeletedAddedUser);
  //   // try to get deleted user - should be undefined
  //   const shouldBeUndefinedUser = await usersRepository.getById(deletedUser.id);
  //   expect(shouldBeUndefinedUser).toBeUndefined();
  //   // check if the second user is not deleted - is defined
  //   const shouldBeDefinedUser = await usersRepository.getById(
  //     shouldStayAddedUser.id,
  //   );
  //   expect(shouldBeDefinedUser).toBeDefined();
  // });
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
