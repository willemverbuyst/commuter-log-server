const { User } = require('../../entities');

module.exports = (dependencies) => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = ({ userName, email, meta }) => {
    const user = new User({ userName, email, meta });

    return usersRepository.add(user);
  };

  return { execute };
};
