const { isEmpty } = require('lodash');
const { ResponseError } = require('../../frameworks/common');
const validator = require('./validator');

module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error('The orders repository should exist in dependencies');
  }

  const getValidationErrors = validator(dependencies);

  const execute = async ({ order }) => {
    const validationErrors = await getValidationErrors({
      order,
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

    return ordersRepository.update(order);
  };

  return { execute };
};
