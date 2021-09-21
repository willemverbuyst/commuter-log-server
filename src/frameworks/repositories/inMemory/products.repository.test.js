const Chance = require('chance');
const { cloneDeep } = require('lodash');
const { productsRepository } = require('.');
const { Product } = require('../../../entities');

const chance = new Chance();

describe('Products repository', () => {
  test('New product should be added and returned', async () => {
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { from: chance.country() },
      },
    });

    const addedProduct = await productsRepository.add(testProduct);

    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct.name);
    expect(addedProduct.description).toBe(testProduct.description);
    expect(addedProduct.images).toEqual(testProduct.images);
    expect(addedProduct.price).toBe(testProduct.price);
    expect(addedProduct.color).toEqual(testProduct.color);
    expect(addedProduct.meta).toEqual(testProduct.meta);

    const returnedProduct = await productsRepository.getById(addedProduct.id);
    expect(returnedProduct).toEqual(addedProduct);
  });
  test('Product should be deleted', async () => {
    // init two products
    const willBeDeletedProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { from: chance.country() },
      },
    });
    const shouldStayProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { from: chance.country() },
      },
    });
    // add two products
    const [willBeDeletedAddedProduct, shouldStayAddedProduct] =
      await Promise.all([
        productsRepository.add(willBeDeletedProduct),
        productsRepository.add(shouldStayProduct),
      ]);
    expect(willBeDeletedAddedProduct).toBeDefined();
    expect(shouldStayAddedProduct).toBeDefined();
    // delete one product
    const deletedProduct = await productsRepository.delete(
      willBeDeletedAddedProduct,
    );
    expect(deletedProduct).toEqual(willBeDeletedAddedProduct);
    // try to get deleted product - should be undefined
    const shouldBeUndefinedProduct = await productsRepository.getById(
      deletedProduct.id,
    );
    expect(shouldBeUndefinedProduct).toBeUndefined();
    // check if the second product is not deleted - is defined
    const shouldBeDefinedProduct = await productsRepository.getById(
      shouldStayAddedProduct.id,
    );
    expect(shouldBeDefinedProduct).toBeDefined();
  });
  test('Product should be updated', async () => {
    // add a product
    const testProduct = new Product({
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {
        deliver: { from: 'China' },
      },
    });

    const addedProduct = await productsRepository.add(testProduct);
    expect(addedProduct).toBeDefined();

    // update a product
    const clonedProduct = cloneDeep({
      ...addedProduct,
      name: chance.name(),
      color: chance.color(),
    });
    const updatedProduct = await productsRepository.update(clonedProduct);
    expect(updatedProduct).toEqual(clonedProduct);
  });
});
