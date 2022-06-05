const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { usersRepository } = require('.');
const { User } = require('../../../entities');

const chance = new Chance();

describe('Users repository', () => {
  test('New user should be added and returned', async () => {
    const testUser = new User({
      userName: chance.name(),
      email: chance.email(),
      meta: { suffix: chance.suffix({ full: true }) },
    });

    const addedUser = await usersRepository.add(testUser);

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.userName).toBe(testUser.userName);
    expect(addedUser.email).toBe(testUser.email);
    expect(addedUser.meta).toEqual(testUser.meta);

    const returnedUser = await usersRepository.getById(addedUser.id);
    expect(returnedUser).toEqual(addedUser);
  });
  test('User should be deleted', async () => {
    // init two users
    const willBeDeletedUser = new User({
      userName: chance.name(),
      email: chance.email(),
      meta: { suffix: chance.suffix({ full: true }) },
    });
    const shouldStayUser = new User({
      userName: chance.name(),
      email: chance.email(),
      meta: { suffix: chance.suffix({ full: true }) },
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
      userName: chance.name(),
      email: chance.email(),
      meta: { suffix: chance.suffix({ full: true }) },
    });
    const addedUser = await usersRepository.add(testUser);
    expect(addedUser).toBeDefined();

    // update a user
    const clonedUser = cloneDeep({
      ...addedUser,
      userName: chance.name(),
      email: chance.email(),
    });
    const updatedUser = await usersRepository.update(clonedUser);
    expect(updatedUser).toEqual(clonedUser);
  });
});
