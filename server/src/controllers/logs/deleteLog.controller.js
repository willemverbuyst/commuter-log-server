const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { deleteLogUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const {
        id,
        userId,
        date,
        statusOfDay,
        durationTrip,
        meansOfTransort,
        startingPoint,
        destination,
        meta,
      } = body;

      const deleteLog = deleteLogUseCase(dependencies);
      const response = await deleteLog.execute({
        log: {
          id,
          userId,
          date,
          statusOfDay,
          durationTrip,
          meansOfTransort,
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
