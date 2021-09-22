const { Log } = require('../../entities');

module.exports = (dependencies) => {
  const { logsRepository } = dependencies;
  if (!logsRepository) {
    throw new Error('The logs repository should exist in dependencies');
  }

  const execute = ({
    date,
    statusOfDay,
    durationTrip,
    meansOfTransport,
    startingPoint,
    destination,
    meta,
  }) => {
    const log = new Log({
      date,
      statusOfDay,
      durationTrip,
      meansOfTransport,
      startingPoint,
      destination,
      meta,
    });

    return logsRepository.add(log);
  };

  return { execute };
};
