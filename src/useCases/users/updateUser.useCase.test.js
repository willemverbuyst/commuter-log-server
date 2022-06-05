const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const updateUserUseCase = require('./updateUser.useCase');

const chance = new Chance();

describe('User use cases', () => {
  const testUserData = {
    userName: chance.name(),
    email: chance.email(),
    meta: { suffix: chance.suffix({ full: true }) },
  };

  const mockUserRepo = {
    add: jest.fn(async (user) => ({
      ...user,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      userName: chance.name(),
      email: chance.email(),
      gender: genders.MALE,
      meta: {},
    })),
    update: jest.fn(async (user) => user),
    delete: jest.fn(async (user) => user),
  };

  const depencies = {
    usersRepository: mockUserRepo,
  };

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
});
