const { Order } = require('../../entities');

module.exports = (dependencies) => {
  const { ordersRepository } = dependencies;
  if (!ordersRepository) {
    throw new Error('The orders repository should exist in dependencies');
  }

  const execute = ({ userId, productIds, date, isPayed, meta }) => {
    const order = new Order({
      userId,
      productIds,
      date,
      isPayed,
      meta,
    });

    return ordersRepository.add(order);
  };

  return { execute };
};
