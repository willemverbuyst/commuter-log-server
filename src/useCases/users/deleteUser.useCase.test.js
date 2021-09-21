const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const deleteUserUseCase = require('./deleteUser.useCase');
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
