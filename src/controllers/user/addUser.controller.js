const { Response } = require('../../frameworks/common/Response');

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { addUserUseCase },
    },
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { body = {} } = req;
      const { name, lastName, gender, meta } = body;

      const addUser = addUserUseCase(dependencies);
      const response = await addUser.execute({
        name,
        lastName,
        gender,
        meta,
      });

      res.json(new Response({ status: true, content: response }));
      next();
    } catch (err) {
      next(err);
    }
  };
};
