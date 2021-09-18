const express = require('express');

const ordersRouter = require('./orders');
const productsRouter = require('./products');
const usersRouter = require('./users');

module.exports = (dependencies) => {
  const routes = express.Router();
  const orders = ordersRouter(dependencies);
  const products = productsRouter(dependencies);
  const users = usersRouter(dependencies);

  routes.use('/orders', orders);
  routes.use('/products', products);
  routes.use('/users', users);

  return routes;
};
