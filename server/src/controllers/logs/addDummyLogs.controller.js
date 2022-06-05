const { Response } = require('../../frameworks/common/Response');
const logDataSeed = require('../../dummyData/dummyLogs');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { addDummyLogsUseCase },
    },
  } = dependencies;

  return async (_req, res, next) => {
    try {
      const addDummyLogs = addDummyLogsUseCase(dependencies);
      const response = await addDummyLogs.execute(logDataSeed);

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
