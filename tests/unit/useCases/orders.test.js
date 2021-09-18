const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const {
  order: {
    addOrderUseCase,
    deleteOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase,
  },
} = require('../../../src/useCases');

const chance = new Chance();

describe('Order use cases', () => {
  const testOrder = {
    userId: uuidv4(),
    productIds: [uuidv4(), uuidv4()],
    date: chance.date(),
    isPayed: chance.bool(),
    meta: { deliver: { destination: chance.country() } },
  };

  const mockOrderRepo = {
    add: jest.fn(async (order) => ({
      ...order,
      id: uuidv4(),
    })),
    delete: jest.fn(async (order) => order),
    getById: jest.fn(async (id) => ({
      id,
      userId: uuidv4(),
      producIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: { deliver: { destination: chance.country() } },
    })),
    update: jest.fn(async (order) => order),
  };

  const depencies = {
    ordersRepository: mockOrderRepo,
  };

  describe('Add order use case', () => {
    test('Order shoud be added', async () => {
      // add an order using the use case
      const addedOrder = await addOrderUseCase(depencies).execute(testOrder);
      // check the received data
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.userId).toBe(testOrder.userId);
      expect(addedOrder.producIds).toEqual(testOrder.producIds);
      expect(addedOrder.date).toBe(testOrder.date);
      expect(addedOrder.isPayed).toBe(testOrder.isPayed);
      expect(addedOrder.meta).toEqual(testOrder.meta);
      // check that the depencies are called as expected
      const expectedOrder = mockOrderRepo.add.mock.calls[0][0];
      expect(expectedOrder).toEqual(testOrder);
    });
  });

  describe('GetById order use case', () => {
    test('Order should be returned by id', async () => {
      // generate fake id
      const fakeId = uuidv4();
      // call get order by id
      const orderById = await getOrderByIdUseCase(depencies).execute({
        id: fakeId,
      });
      // check the data
      expect(orderById).toBeDefined();
      expect(orderById.id).toBe(fakeId);
      expect(orderById.userId).toBeDefined();
      expect(orderById.producIds).toBeDefined();
      expect(orderById.date).toBeDefined();
      expect(orderById.isPayed).toBeDefined();
      expect(orderById.meta).toBeDefined();
      // check the call
      const expectedId = mockOrderRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    });
  });

  describe('Update product use case', () => {
    test('Product should be updated', async () => {
      // create order
      const mockOrder = {
        ...testOrder,
        id: uuidv4(),
      };
      const updatedOrder = await updateOrderUseCase(depencies).execute({
        order: cloneDeep(mockOrder),
      });
      // check the result
      expect(updatedOrder).toEqual(mockOrder);

      // check the call
      const expectedOrder = mockOrderRepo.update.mock.calls[0][0];
      expect(expectedOrder).toEqual(mockOrder);
    });
  });

  describe('Delete order use case', () => {
    test('Order should be deleted', async () => {
      // create order
      const mockOrder = {
        id: uuidv4(),
        ...testOrder,
      };

      const deletedOrder = await deleteOrderUseCase(depencies).execute({
        order: cloneDeep(mockOrder),
      });
      // check the result
      expect(deletedOrder).toEqual(mockOrder);

      // check the call
      const expectedOrder = mockOrderRepo.delete.mock.calls[0][0];
      expect(expectedOrder).toEqual(mockOrder);
    });
  });
});
