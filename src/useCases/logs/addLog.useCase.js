const { isEmpty } = require('lodash');
const { Log } = require('../../entities');
const { ResponseError } = require('../../frameworks/common');
const validator = require('./validator');

module.exports = (dependencies) => {
  const { logsRepository } = dependencies;

  if (!logsRepository) {
    throw new Error('The logs repository should exist in dependencies');
  }

  const getValidationErrors = validator(dependencies);

  const execute = async ({
    userId,
    date,
    statusOfDay,
    durationTrip,
    meansOfTransport,
    startingPoint,
    destination,
    meta,
  }) => {
    const log = new Log({
      userId,
      date,
      statusOfDay,
      durationTrip,
      meansOfTransport,
      startingPoint,
      destination,
      meta,
    });

    const validationErrors = await getValidationErrors({
      log,
    });

    if (!isEmpty(validationErrors)) {
      return Promise.reject(
        new ResponseError({
          status: 403,
          msg: 'Validation Errors',
          reason: 'Somebody sent bad data',
          validationErrors,
        }),
      );
    }

    return logsRepository.add(log);
  };

  return { execute };
};
