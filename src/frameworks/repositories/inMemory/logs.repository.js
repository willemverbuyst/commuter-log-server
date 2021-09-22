const { inMemory: inMemoryDb } = require('../../database/index');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  add: async (log) => {
    if (!log.id) {
      log.id = uuidv4();
    }
    inMemoryDb.logs.push(log);
    return log;
  },
  update: async (log) => {
    const index = inMemoryDb.logs.findIndex((item) => item.id === log.id);
    if (index >= 0) {
      inMemoryDb.logs[index] = log;
      return inMemoryDb.logs[index];
    }
    return null;
  },
  delete: async (log) => {
    const index = inMemoryDb.logs.findIndex((item) => item.id === log.id);
    if (index >= 0) {
      inMemoryDb.logs.splice(index, 1);
      return log;
    }
    return null;
  },
  getById: async (id) => {
    return inMemoryDb.logs.find((item) => item.id === id);
  },
};
