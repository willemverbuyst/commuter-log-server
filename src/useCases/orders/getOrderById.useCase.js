module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error('The orders repository should exist in dependencies');
  }

  const execute = ({ id }) => {
    return ordersRepository.getById(id);
  };

  return { execute };
};
