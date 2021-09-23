const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const addLogUseCase = require('./addLog.useCase');
const {
  constants: {
    logConstants: { meansOfTransport, statusOfDay },
    userConstants: { genders },
  },
} = require('../../entities');
const { usersRepository } = require('../../frameworks/repositories/inMemory');
const {
  user: { addUserUseCase, getUserByIdUseCase },
} = require('../');
const { ValidationError } = require('../../frameworks/common');

const chance = new Chance();

describe('Log use cases', () => {
  let testLogData;

  const mockLogRepo = {
    add: jest.fn(async (log) => ({
      ...log,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      userId: uuidv4(),
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    })),
    update: jest.fn(async (log) => log),
    delete: jest.fn(async (log) => log),
  };

  const dependencies = {
    logsRepository: mockLogRepo,
    usersRepository,
    useCases: {
      user: {
        getUserByIdUseCase: jest.fn((dependencies) =>
          getUserByIdUseCase(dependencies),
        ),
      },
    },
  };

  beforeAll(async () => {
    const addUser = addUserUseCase(dependencies).execute;

    mockUser = await addUser({
      name: chance.name(),
      lastName: chance.last(),
      gender: genders.FEMALE,
      meta: { hair: { color: chance.color() } },
    });

    testLogData = {
      userId: mockUser.id,
      date: chance.date(),
      statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
      durationTrip: chance.natural(),
      meansOfTransport: meansOfTransport.CAR,
      startingPoint: chance.city(),
      destination: chance.city(),
      meta: { comment: chance.sentence() },
    };
  });

  describe('Add log use case', () => {
    test('Log shoud be added', async () => {
      // add a log using the use case
      const addedLog = await addLogUseCase(dependencies).execute(testLogData);
      // check the received data
      expect(addedLog).toBeDefined();
      expect(addedLog.id).toBeDefined();
      expect(addedLog.userId).toBe(testLogData.userId);
      expect(addedLog.date).toBe(testLogData.date);
      expect(addedLog.statusOfDay).toBe(testLogData.statusOfDay);
      expect(addedLog.durationTrip).toBe(testLogData.durationTrip);
      expect(addedLog.meansOfTransport).toBe(testLogData.meansOfTransport);
      expect(addedLog.startingPoint).toBe(testLogData.startingPoint);
      expect(addedLog.destination).toBe(testLogData.destination);
      expect(addedLog.meta).toEqual(testLogData.meta);
      // check that the dependencies are called as expected
      const call = mockLogRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.userId).toBe(testLogData.userId);
      expect(call.date).toBe(testLogData.date);
      expect(call.statusOfDay).toBe(testLogData.statusOfDay);
      expect(call.durationTrip).toBe(testLogData.durationTrip);
      expect(call.meansOfTransport).toBe(testLogData.meansOfTransport);
      expect(call.startingPoint).toBe(testLogData.startingPoint);
      expect(call.destination).toBe(testLogData.destination);
      expect(call.meta).toEqual(testLogData.meta);
    });

    test('Should return validation error when user id unknown', async () => {
      const fakeId = uuidv4();
      try {
        await addLogUseCase(dependencies).execute({
          ...testLogData,
          userId: fakeId,
        });
        expect(true).toBe(false);
      } catch (err) {
        expect(err.status).toBe(403);
        expect(err.validationErrors).toEqual([
          new ValidationError({
            field: 'userId',
            message: 'Something failed!',
            msg: `No user with id ${fakeId}`,
          }),
        ]);
      }
    });
  });
});
