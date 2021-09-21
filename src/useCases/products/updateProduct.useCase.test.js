const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const updateProductUseCase = require('./updateProduct.useCase');

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

  describe('Update product use case', () => {
    test('Product should be updated', async () => {
      // create product
      const mockProduct = {
        id: uuidv4(),
        ...testProductData,
      };
      const updatedProduct = await updateProductUseCase(depencies).execute({
        product: cloneDeep(mockProduct),
      });
      // check the result
      expect(updatedProduct).toEqual(mockProduct);

      // check the call
      const expectedProduct = mockProductRepo.update.mock.calls[0][0];
      expect(expectedProduct).toEqual(mockProduct);
    });
  });
});
