module.exports = (dependencies) => {
  const { logsRepository } = dependencies;
  if (!logsRepository) {
    throw new Error('The logs repository should exist in dependencies');
  }

  const execute = ({ log = {} }) => {
    return logsRepository.delete(log);
  };

  return { execute };
};
