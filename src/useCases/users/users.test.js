const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const {
  user: {
    addUserUseCase,
    deleteUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
  },
} = require('../');
const {
  constants: {
    userConstants: { genders },
  },
} = require('../../entities');

const chance = new Chance();

describe('User use cases', () => {
  const testUserData = {
    name: chance.name(),
    lastName: chance.last(),
    gender: genders.FEMALE,
    meta: { hair: { color: chance.color() } },
  };

  const mockUserRepo = {
    add: jest.fn(async (user) => ({
      ...user,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.MALE,
      meta: {},
    })),
    update: jest.fn(async (user) => user),
    delete: jest.fn(async (user) => user),
  };

  const depencies = {
    usersRepository: mockUserRepo,
  };

  describe('Add user use case', () => {
    test('User shoud be added', async () => {
      // add a user using the use case
      const addedUser = await addUserUseCase(depencies).execute(testUserData);
      // check the received data
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.name).toBe(testUserData.name);
      expect(addedUser.lastName).toBe(testUserData.lastName);
      expect(addedUser.gender).toBe(testUserData.gender);
      expect(addedUser.meta).toEqual(testUserData.meta);
      // check that the depencies are called as expected
      const call = mockUserRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.name).toBe(testUserData.name);
      expect(call.lastName).toBe(testUserData.lastName);
      expect(call.gender).toBe(testUserData.gender);
      expect(call.meta).toEqual(testUserData.meta);
    });
  });

  describe('GetById user use case', () => {
    test('User should be returned by id', async () => {
      // generate fake id
      const fakeId = uuidv4();
      // call get user by id
      const userById = await getUserByIdUseCase(depencies).execute({
        id: fakeId,
      });
      // check the data
      expect(userById).toBeDefined();
      expect(userById.id).toBe(fakeId);
      expect(userById.name).toBeDefined();
      expect(userById.lastName).toBeDefined();
      expect(userById.gender).toBeDefined();
      expect(userById.meta).toBeDefined();
      // check the call
      const expectedId = mockUserRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    });
  });

  describe('Update user use case', () => {
    test('User should be updated', async () => {
      // create user
      const mockUser = {
        ...testUserData,
        id: uuidv4(),
      };
      const updatedUser = await updateUserUseCase(depencies).execute({
        user: cloneDeep(mockUser),
      });
      // check the result
      expect(updatedUser).toEqual(mockUser);

      // check the call
      const expectedUser = mockUserRepo.update.mock.calls[0][0];
      expect(expectedUser).toEqual(mockUser);
    });
  });

  describe('Delete user use case', () => {
    test('User should be deleted', async () => {
      // create user
      const mockUser = {
        ...testUserData,
        id: uuidv4(),
      };
      const deletedUser = await deleteUserUseCase(depencies).execute({
        user: cloneDeep(mockUser),
      });
      // check the result
      expect(deletedUser).toEqual(mockUser);

      // check the call
      const expectedUser = mockUserRepo.delete.mock.calls[0][0];
      expect(expectedUser).toEqual(mockUser);
    });
  });
});
