module.exports = (dependencies) => {
  const { logsRepository } = dependencies;

  if (!logsRepository) {
    throw new Error('The logs repository should exist in dependencies');
  }

  const execute = async (logs) => {
    return logsRepository.addDummyLogs(logs);
  };

  return { execute };
};
