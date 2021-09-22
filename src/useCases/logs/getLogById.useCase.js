module.exports = (dependencies) => {
  const { logsRepository } = dependencies;
  if (!logsRepository) {
    throw new Error('The logs repository should exist in dependencies');
  }

  const execute = ({ id }) => {
    return logsRepository.getById(id);
  };

  return { execute };
};
