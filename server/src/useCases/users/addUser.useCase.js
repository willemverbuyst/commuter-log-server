const bcrypt = require('bcryptjs');
const { User } = require('../../entities');

module.exports = (dependencies) => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = ({ userName, password, email, meta }) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({ userName, password: hashPassword, email, meta });

    return usersRepository.add(user);
  };

  return { execute };
};
