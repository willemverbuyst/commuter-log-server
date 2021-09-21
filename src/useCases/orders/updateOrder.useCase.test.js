const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const {
  productsRepository,
  usersRepository,
} = require('../../frameworks/repositories/inMemory');
const updateOrderUseCase = require('./updateOrder.useCase');
const {
  user: { addUserUseCase, getUserByIdUseCase },
  product: { addProductUseCase, getProductByIdUseCase },
} = require('../');
const {
  constants: {
    userConstants: { genders },
  },
} = require('../../entities');

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
});
