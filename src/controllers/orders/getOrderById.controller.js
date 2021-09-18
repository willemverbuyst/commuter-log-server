const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      order: { getOrderByIdUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { params = {} } = req;
      const { id } = params;

      const getOrderById = getOrderByIdUseCase(dependencies);
      const response = await getOrderById.execute({
        id,
      });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
