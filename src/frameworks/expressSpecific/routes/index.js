const express = require('express');

const logsRouter = require('./logs');
const productsRouter = require('./products');
const usersRouter = require('./users');

module.exports = (dependencies) => {
  const routes = express.Router();
  const logs = logsRouter(dependencies);
  const products = productsRouter(dependencies);
  const users = usersRouter(dependencies);

  routes.use('/logs', logs);
  routes.use('/products', products);
  routes.use('/users', users);

  return routes;
};
