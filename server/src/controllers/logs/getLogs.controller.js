const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { getLogsUseCase },
    },
  } = dependencies;

  return async (_req, res, next) => {
    try {
      const getAllLogs = getLogsUseCase(dependencies);
      const response = await getAllLogs.execute();

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
