const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { usersRepository } = require('./');
const {
  User,
  constants: {
    userConstants: { genders },
  },
} = require('../../../entities');

const chance = new Chance();

describe('Users repository', () => {
  test('New user should be added and returned', async () => {
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: { hair: { color: 'Black' } },
    });

    const addedUser = await usersRepository.add(testUser);

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(testUser.name);
    expect(addedUser.lastName).toBe(testUser.lastName);
    expect(addedUser.gender).toBe(testUser.gender);
    expect(addedUser.meta).toEqual(testUser.meta);

    const returnedUser = await usersRepository.getById(addedUser.id);
    expect(returnedUser).toEqual(addedUser);
  });
  test('User should be deleted', async () => {
    // init two users
    const willBeDeletedUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: { hair: { color: 'Black' } },
    });
    const shouldStayUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: { hair: { color: 'Blond' } },
    });
    // add two users
    const [willBeDeletedAddedUser, shouldStayAddedUser] = await Promise.all([
      usersRepository.add(willBeDeletedUser),
      usersRepository.add(shouldStayUser),
    ]);
    expect(willBeDeletedAddedUser).toBeDefined();
    expect(shouldStayAddedUser).toBeDefined();
    // delete one user
    const deletedUser = await usersRepository.delete(willBeDeletedAddedUser);
    expect(deletedUser).toEqual(willBeDeletedAddedUser);
    // try to get deleted user - should be undefined
    const shouldBeUndefinedUser = await usersRepository.getById(deletedUser.id);
    expect(shouldBeUndefinedUser).toBeUndefined();
    // check if the second user is not deleted - is defined
    const shouldBeDefinedUser = await usersRepository.getById(
      shouldStayAddedUser.id,
    );
    expect(shouldBeDefinedUser).toBeDefined();
  });
  test('User should be updated', async () => {
    // add a user
    const testUser = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: { hair: { color: 'Black' } },
    });
    const addedUser = await usersRepository.add(testUser);
    expect(addedUser).toBeDefined();

    // update a user
    const clonedUser = cloneDeep({
      ...addedUser,
      name: chance.name(),
      gender: genders.MALE,
    });
    const updatedUser = await usersRepository.update(clonedUser);
    expect(updatedUser).toEqual(clonedUser);
  });
});
