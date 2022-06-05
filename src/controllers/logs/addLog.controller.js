const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { addLogUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const {
        userId,
        date,
        statusOfDay,
        durationTrip,
        meansOfTransport,
        startingPoint,
        destination,
        meta,
      } = body;

      const addLog = addLogUseCase(dependencies);
      const response = await addLog.execute({
        userId,
        date,
        statusOfDay,
        durationTrip,
        meansOfTransport,
        startingPoint,
        destination,
        meta,
      });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
