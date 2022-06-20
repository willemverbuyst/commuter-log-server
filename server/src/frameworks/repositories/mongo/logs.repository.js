const mongoose = require('mongoose');
const entityName = 'Log';

const {
  schemas: { log: logSchema },
} = require('../../database/mongo');

const repository = () => {
  // Schema
  const Log = mongoose.model(entityName, logSchema);
  // CRUD executables
  return {
    add: async (log) => {
      const mongoObject = new Log(log);
      return mongoObject.save();
    },
    addDummyLogs: async (logs) => {
      return Log.insertMany(logs);
    },
    update: async (log) => {
      const { id } = log;
      delete log.id;
      return Log.findByIdAndUpdate(
        id,
        {
          ...log,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      ).lean();
    },
    delete: async (log) => {
      const { id } = log;
      delete log.id;
      return Log.deleteOne({ id }).lean();
    },
    getById: async (id) => {
      return Log.findOne({
        _id: id,
        deletedAt: {
          $exists: false,
        },
      });
    },
    getAll: async () => {
      return Log.find({
        deletedAt: {
          $exists: false,
        },
      });
    },
  };
};

module.exports = repository();
