const Chance = require('chance');
const { v4: uuidv4 } = require('uuid');
const addProductUseCase = require('./addProduct.useCase');

const chance = new Chance();

describe('Product use cases', () => {
  const testProductData = {
    name: chance.name(),
    description: chance.sentence(),
    images: [chance.url(), chance.url()],
    price: chance.natural(),
    color: chance.color(),
    meta: { comment: 'test' },
  };

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

  describe('Add product use case', () => {
    test('Product shoud be added', async () => {
      // add product using the use case
      const addedProduct = await addProductUseCase(depencies).execute(
        testProductData,
      );
      // check the received data
      expect(addedProduct).toBeDefined();
      expect(addedProduct.id).toBeDefined();
      expect(addedProduct.name).toBe(testProductData.name);
      expect(addedProduct.description).toBe(testProductData.description);
      expect(addedProduct.images).toEqual(testProductData.images);
      expect(addedProduct.price).toBe(testProductData.price);
      expect(addedProduct.color).toBe(testProductData.color);
      expect(addedProduct.meta).toEqual(testProductData.meta);
      // check that the depencies are called as expected
      const expectedProduct = mockProductRepo.add.mock.calls[0][0];
      expect(expectedProduct).toEqual(testProductData);
    });
  });
});
