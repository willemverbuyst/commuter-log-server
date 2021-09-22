const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const addLogUseCase = require('./addLog.useCase');
const {
  constants: {
    logConstants: { meansOfTransport, statusOfDay },
  },
} = require('../../entities');

const chance = new Chance();

describe('Log use cases', () => {
  const testLogData = {
    date: chance.date(),
    statusOfDay: statusOfDay.WORKING_AT_THE_OFFICE,
    durationTrip: chance.natural(),
    meansOfTransport: meansOfTransport.CAR,
    startingPoint: chance.city(),
    destination: chance.city(),
    meta: { comment: chance.sentence() },
  };

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

  describe('Add log use case', () => {
    test('Log shoud be added', async () => {
      // add a log using the use case
      const addedLog = await addLogUseCase(depencies).execute(testLogData);
      // check the received data
      expect(addedLog).toBeDefined();
      expect(addedLog.id).toBeDefined();
      expect(addedLog.date).toBe(testLogData.date);
      expect(addedLog.statusOfDay).toBe(testLogData.statusOfDay);
      expect(addedLog.durationTrip).toBe(testLogData.durationTrip);
      expect(addedLog.meansOfTransport).toBe(testLogData.meansOfTransport);
      expect(addedLog.startingPoint).toBe(testLogData.startingPoint);
      expect(addedLog.destination).toBe(testLogData.destination);
      expect(addedLog.meta).toEqual(testLogData.meta);
      // check that the depencies are called as expected
      const call = mockLogRepo.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.date).toBe(testLogData.date);
      expect(call.statusOfDay).toBe(testLogData.statusOfDay);
      expect(call.durationTrip).toBe(testLogData.durationTrip);
      expect(call.meansOfTransport).toBe(testLogData.meansOfTransport);
      expect(call.startingPoint).toBe(testLogData.startingPoint);
      expect(call.destination).toBe(testLogData.destination);
      expect(call.meta).toEqual(testLogData.meta);
    });
  });
});
