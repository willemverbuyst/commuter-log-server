const { ValidationError } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    useCases: {
      user: { getUserByIdUseCase },
    },
  } = dependencies;

  if (!getUserByIdUseCase) {
    throw new Error('getUserByIdUseCase should be exist in dependencies');
  }

  const getUserById = getUserByIdUseCase(dependencies).execute;

  return async ({ log = {} }) => {
    const returnable = [];
    const { userId } = log;

    const user = await getUserById({
      id: userId,
    });

    if (!user) {
      returnable.push(
        new ValidationError({
          field: 'userId',
          msg: `No user with id ${userId}`,
        }),
      );
    }

    return returnable;
  };
};
