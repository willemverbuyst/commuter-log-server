const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const { cloneDeep } = require('lodash');
const { ordersRepository } = require('.');
const { Order } = require('../../../entities');

const chance = new Chance();

describe('Orders repository', () => {
  test('New order should be added and returned', async () => {
    const testOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        comment: { to: chance.sentence() },
      },
    });

    const addedOrder = await ordersRepository.add(testOrder);

    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productIds).toEqual(testOrder.productIds);
    expect(addedOrder.date).toBe(testOrder.date);
    expect(addedOrder.isPayed).toBe(testOrder.isPayed);
    expect(addedOrder.meta).toEqual(testOrder.meta);

    const returnedOrder = await ordersRepository.getById(addedOrder.id);
    expect(returnedOrder).toEqual(addedOrder);
  });
  test('Order should be deleted', async () => {
    // init two orders
    const willBeDeletedOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        comment: { to: chance.sentence() },
      },
    });
    const shouldStayOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        comment: { to: chance.sentence() },
      },
    });
    // add two orders
    const [willBeDeletedAddedOrder, shouldStayAddedOrder] = await Promise.all([
      ordersRepository.add(willBeDeletedOrder),
      ordersRepository.add(shouldStayOrder),
    ]);
    expect(willBeDeletedAddedOrder).toBeDefined();
    expect(shouldStayAddedOrder).toBeDefined();
    // delete one order
    const deletedOrder = await ordersRepository.delete(willBeDeletedAddedOrder);
    expect(deletedOrder).toEqual(willBeDeletedAddedOrder);
    // try to get deleted order - should be undefined
    const shouldBeUndefinedOrder = await ordersRepository.getById(
      deletedOrder.id,
    );
    expect(shouldBeUndefinedOrder).toBeUndefined();
    // check if the second order is not deleted - is defined
    const shouldBeDefinedOrder = await ordersRepository.getById(
      shouldStayAddedOrder.id,
    );
    expect(shouldBeDefinedOrder).toBeDefined();
  });
  test('Order should be updated', async () => {
    // add a order
    const testOrder = new Order({
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        comment: { to: chance.sentence() },
      },
    });
    const addedOrder = await ordersRepository.add(testOrder);
    expect(addedOrder).toBeDefined();

    // update a product
    const clonedOrder = cloneDeep({
      ...addedOrder,
      isPayed: chance.bool(),
      productIds: [...testOrder.productIds, uuidv4()],
    });
    const updatedOrder = await ordersRepository.update(clonedOrder);
    expect(updatedOrder).toEqual(clonedOrder);
  });
});
