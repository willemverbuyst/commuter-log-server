const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const {
  product: {
    addProductUseCase,
    deleteProductUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
  },
} = require('../');

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

  describe('Delete product use case', () => {
    test('Product should be deleted', async () => {
      // create product
      const mockProduct = {
        id: uuidv4(),
        ...testProductData,
      };

      const deletedProduct = await deleteProductUseCase(depencies).execute({
        product: cloneDeep(mockProduct),
      });
      // check the result
      expect(deletedProduct).toEqual(mockProduct);

      // check the call
      const expectedProduct = mockProductRepo.delete.mock.calls[0][0];
      expect(expectedProduct).toEqual(mockProduct);
    });
  });
});
