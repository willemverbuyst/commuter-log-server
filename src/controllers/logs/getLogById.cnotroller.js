const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      log: { getLogByIdUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const getLogById = getLogByIdUseCase(dependencies);
      const response = await getLogById.execute({ id });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
