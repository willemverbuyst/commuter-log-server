const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const {
  productsRepository,
  usersRepository,
} = require('../../../src/frameworks/repositories/inMemory');
const {
  order: {
    addOrderUseCase,
    deleteOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase,
  },
  user: { addUserUseCase, getUserByIdUseCase },
  product: { addProductUseCase, getProductByIdUseCase },
  product,
} = require('../../../src/useCases');
const {
  constants: {
    userConstants: { genders },
  },
} = require('../../../src/entities');
const { ValidationError } = require('../../../src/frameworks/common');

const chance = new Chance();

describe('Order use cases', () => {
  let testOrder;

  const mockOrderRepo = {
    add: jest.fn(async (order) => ({
      ...order,
      id: uuidv4(),
    })),
    delete: jest.fn(async (order) => order),
    getById: jest.fn(async (id) => ({
      id,
      userId: uuidv4(),
      productIds: [uuidv4(), uuidv4()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: { deliver: { destination: chance.country() } },
    })),
    update: jest.fn(async (order) => order),
  };

  const dependencies = {
    ordersRepository: mockOrderRepo,
    productsRepository,
    usersRepository,
    useCases: {
      user: {
        getUserByIdUseCase: jest.fn((dependencies) =>
          getUserByIdUseCase(dependencies),
        ),
      },
      product: {
        getProductByIdUseCase: jest.fn((dependencies) =>
          getProductByIdUseCase(dependencies),
        ),
      },
    },
  };

  const mock = {};

  beforeAll(async () => {
    const addProduct = addProductUseCase(dependencies).execute;
    const addUser = addUserUseCase(dependencies).execute;

    mock.products = await Promise.all(
      [1, 2, 3].map(() =>
        addProduct({
          name: chance.name(),
          describe: chance.sentence(),
          images: [chance.url(), chance.url()],
          price: chance.natural(),
          color: chance.color(),
          meta: {
            destination: chance.country(),
          },
        }),
      ),
    );

    mock.users = await Promise.all(
      [1, 2, 3].map(() =>
        addUser({
          name: chance.name(),
          lastName: chance.last(),
          gender: genders.FEMALE,
          meta: { hair: { color: chance.color() } },
        }),
      ),
    );

    testOrder = {
      userId: mock.users[0].id,
      productIds: mock.products.map((product) => product.id),
      date: chance.date(),
      isPayed: chance.bool(),
      meta: { deliver: { destination: chance.country() } },
    };
  });

  describe('Add order use case', () => {
    test('Order shoud be added', async () => {
      // add an order using the use case
      const addedOrder = await addOrderUseCase(dependencies).execute(testOrder);
      // check the received data
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.userId).toBe(testOrder.userId);
      expect(addedOrder.productIds).toEqual(testOrder.productIds);
      expect(addedOrder.date).toBe(testOrder.date);
      expect(addedOrder.isPayed).toBe(testOrder.isPayed);
      expect(addedOrder.meta).toEqual(testOrder.meta);
      // check that the dependencies are called as expected
      const expectedOrder = mockOrderRepo.add.mock.calls[0][0];
      expect(expectedOrder).toEqual(testOrder);
    });

    test('Should return validation error when product id unknown', async () => {
      const fakeId = uuidv4();
      try {
        await addOrderUseCase(dependencies).execute({
          ...testOrder,
          productIds: [...testOrder.productIds, fakeId],
        });
        expect(true).toBe(false);
      } catch (err) {
        expect(err.status).toBe(403);
        expect(err.validationErrors).toEqual([
          new ValidationError({
            field: 'productIds',
            message: 'Something failed!',
            msg: `No products with ids ${fakeId}`,
          }),
        ]);
      }
    });

    test('Should return validation error when user id unknown', async () => {
      const fakeId = uuidv4();
      try {
        await addOrderUseCase(dependencies).execute({
          ...testOrder,
          userId: fakeId,
        });
        expect(true).toBe(false);
      } catch (err) {
        expect(err.status).toBe(403);
        expect(err.validationErrors).toEqual([
          new ValidationError({
            field: 'userId',
            message: 'Something failed!',
            msg: `No user found with id ${fakeId}`,
          }),
        ]);
      }
    });
  });

  describe('GetById order use case', () => {
    test('Order should be returned by id', async () => {
      // generate fake id
      const fakeId = uuidv4();
      // call get order by id
      const orderById = await getOrderByIdUseCase(dependencies).execute({
        id: fakeId,
      });
      // check the data
      expect(orderById).toBeDefined();
      expect(orderById.id).toBe(fakeId);
      expect(orderById.userId).toBeDefined();
      expect(orderById.productIds).toBeDefined();
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
      const updatedOrder = await updateOrderUseCase(dependencies).execute({
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

      const deletedOrder = await deleteOrderUseCase(dependencies).execute({
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
