const { isEmpty } = require('lodash');
const { Order } = require('../../entities');
const { ResponseError, ValidationError } = require('../../frameworks/common');

module.exports = (dependencies) => {
  const {
    ordersRepository,
    useCases: {
      user: { getUserByIdUseCase },
      product: { getProductByIdUseCase },
    },
  } = dependencies;

  if (!ordersRepository) {
    throw new Error('The orders repository should exist in dependencies');
  }

  if (!getUserByIdUseCase) {
    throw new Error('getUserByIdUseCase should exist in dependencies');
  }

  if (!getProductByIdUseCase) {
    throw new Error('getProductByIdUseCase should exist in dependencies');
  }

  const getUserById = getUserByIdUseCase(dependencies).execute;
  const getProductById = getProductByIdUseCase(dependencies).execute;

  const getValidationErrors = async ({ order }) => {
    const returnable = [];

    const { productIds = [], userId } = order;

    const products = await Promise.all(
      productIds.map((id) => getProductById({ id })),
    );

    const notFoundIds = products.reduce((acc, product, index) => {
      if (!product) {
        acc.push(productIds[index]);
      }
      return acc;
    }, []);

    if (!isEmpty(notFoundIds)) {
      returnable.push(
        new ValidationError({
          field: 'productIds',
          msg: `No products with ids ${notFoundIds.join(', ')}`,
        }),
      );
    }

    const user = await getUserById({ id: userId });

    if (!user) {
      returnable.push(
        new ValidationError({
          field: 'userId',
          msg: `No user found with id ${userId}`,
        }),
      );
    }

    return returnable;
  };

  const execute = async ({ userId, productIds, date, isPayed, meta }) => {
    const order = new Order({
      userId,
      productIds,
      date,
      isPayed,
      meta,
    });

    const validationErrors = await getValidationErrors({ order });

    if (!isEmpty(validationErrors)) {
      return Promise.reject(
        new ResponseError({
          status: 403,
          msg: 'Validation errors',
          reason: 'Bad data sent',
          validationErrors,
        }),
      );
    }

    return ordersRepository.add(order);
  };

  return { execute };
};
