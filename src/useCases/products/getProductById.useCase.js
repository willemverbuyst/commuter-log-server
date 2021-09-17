module.exports = (dependencies) => {
  const { productsRepository } = dependencies;
  if (!productsRepository) {
    throw new Error('The products repository should exist in dependencies');
  }

  const execute = ({ id }) => {
    return productsRepository.getById(id);
  };

  return { execute };
};
