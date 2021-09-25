const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const updateLogUseCase = require('./updateLog.useCase');
const {
  user: { addUserUseCase, getUserByIdUseCase },
} = require('../');
const {
  constants: {
    logConstants: { meansOfTransport, statusOfDay },
  },
} = require('../../entities');
const { usersRepository } = require('../../frameworks/repositories/inMemory');
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
      userName: chance.name(),
      email: chance.email(),
      meta: { suffix: chance.suffix({ full: true }) },
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

  describe('Update log use case', () => {
    test('Log should be updated', async () => {
      // create log
      const mockLog = {
        ...testLogData,
        id: uuidv4(),
      };
      const updatedLog = await updateLogUseCase(dependencies).execute({
        log: cloneDeep(mockLog),
      });
      // check the result
      expect(updatedLog).toEqual(mockLog);

      // check the call
      const expectedLog = mockLogRepo.update.mock.calls[0][0];
      expect(expectedLog).toEqual(mockLog);
    });

    test('Should return validation error when user id unknown', async () => {
      const fakeId = uuidv4();
      try {
        await updateLogUseCase(dependencies).execute({
          log: {
            ...testLogData,
            userId: fakeId,
          },
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
