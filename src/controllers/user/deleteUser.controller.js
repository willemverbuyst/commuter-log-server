const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { deleteUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { id, userName, email, meta } = body;

      const deleteUser = deleteUserUseCase(dependencies);
      const response = await deleteUser.execute({
        user: {
          id,
          userName,
          email,
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
