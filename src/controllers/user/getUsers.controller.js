const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { getUsersUseCase },
    },
  } = dependencies;

  return async (_req, res, next) => {
    try {
      const getAllUsers = getUsersUseCase(dependencies);
      const response = await getAllUsers.execute();

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
