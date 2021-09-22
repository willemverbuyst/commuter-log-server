const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const getLogByIdUseCase = require('./getLogById.useCase');
const {
  constants: {
    logConstants: { statusOfDay, meansOfTransport },
  },
} = require('../../entities');

const chance = new Chance();

describe('Log use cases', () => {
  const mockLogRepo = {
    add: jest.fn(async (log) => ({
      ...log,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
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

  const depencies = {
    logsRepository: mockLogRepo,
  };

  describe('GetById log use case', () => {
    test('Log should be returned by id', async () => {
      // generate fake id
      const fakeId = uuidv4();
      // call get log by id
      const logById = await getLogByIdUseCase(depencies).execute({
        id: fakeId,
      });
      // check the data
      expect(logById).toBeDefined();
      expect(logById.id).toBe(fakeId);
      expect(logById.date).toBeDefined();
      expect(logById.statusOfDay).toBeDefined();
      expect(logById.durationTrip).toBeDefined();
      expect(logById.meansOfTransport).toBeDefined();
      expect(logById.statusOfDay).toBeDefined();
      expect(logById.destination).toBeDefined();
      expect(logById.meta).toBeDefined();
      // check the call
      const expectedId = mockLogRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    });
  });
});
