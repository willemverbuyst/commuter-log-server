const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const addUserUseCase = require('./addUser.useCase');

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
      userName: chance.userName(),
      email: chance.email(),
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
      expect(addedUser.userName).toBe(testUserData.userName);
      expect(addedUser.email).toBe(testUserData.email);
      expect(addedUser.meta).toEqual(testUserData.meta);
      // check that the depencies are called as expected
      const call = mockUserRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.userName).toBe(testUserData.userName);
      expect(call.email).toBe(testUserData.email);
      expect(call.meta).toEqual(testUserData.meta);
    });
  });
});
