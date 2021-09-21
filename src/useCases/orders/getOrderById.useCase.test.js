const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const {
  productsRepository,
  usersRepository,
} = require('../../frameworks/repositories/inMemory');
const getOrderByIdUseCase = require('./getOrderById.useCase');
const {
  user: { getUserByIdUseCase },
  product: { getProductByIdUseCase },
} = require('../');

const chance = new Chance();

describe('Order use cases', () => {
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
});
