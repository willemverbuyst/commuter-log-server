const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const getProductByIdUseCase = require('./getProductById.useCase');

const chance = new Chance();

describe('Product use cases', () => {
  const mockProductRepo = {
    add: jest.fn(async (product) => ({
      ...product,
      id: uuidv4(),
    })),
    getById: jest.fn(async (id) => ({
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: { comment: 'test' },
    })),
    update: jest.fn(async (product) => product),
    delete: jest.fn(async (product) => product),
  };

  const depencies = {
    productsRepository: mockProductRepo,
  };

  describe('GetById product use case', () => {
    test('Product should be returned by id', async () => {
      // generate fake id
      const fakeId = uuidv4();
      // call get product by id
      const productById = await getProductByIdUseCase(depencies).execute({
        id: fakeId,
      });
      // check the data
      expect(productById).toBeDefined();
      expect(productById.id).toBe(fakeId);
      expect(productById.name).toBeDefined();
      expect(productById.description).toBeDefined();
      expect(productById.images).toBeDefined();
      expect(productById.price).toBeDefined();
      expect(productById.color).toBeDefined();
      expect(productById.meta).toBeDefined();
      // check the call
      const expectedId = mockProductRepo.getById.mock.calls[0][0];
      expect(expectedId).toBe(fakeId);
    });
  });
});
