const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { updateUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { id, userName, email, meta } = body;

      const updateUser = updateUserUseCase(dependencies);
      const response = await updateUser.execute({
        user: { id, userName, email, meta },
      });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
