const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      order: { updateOrderUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { id, userId, productIds, date, isPayed, meta } = body;

      const updateOrder = updateOrderUseCase(dependencies);
      const response = await updateOrder.execute({
        order: {
          id,
          userId,
          productIds,
          date,
          isPayed,
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
