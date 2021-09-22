const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { updateLogUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const {
        id,
        date,
        statusOfDay,
        durationTrip,
        meansOfTransport,
        startingPoint,
        destination,
        meta,
      } = body;

      const updateLog = updateLogUseCase(dependencies);
      const response = await updateLog.execute({
        log: {
          id,
          date,
          statusOfDay,
          durationTrip,
          meansOfTransport,
          startingPoint,
          destination,
          meta,
        },
      });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
