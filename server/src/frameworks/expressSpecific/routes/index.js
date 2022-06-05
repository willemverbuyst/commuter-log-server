const express = require('express');

const logsRouter = require('./logs');
const rootRouter = require('./root');
const usersRouter = require('./users');

module.exports = (dependencies) => {
  const routes = express.Router();
  const logs = logsRouter(dependencies);
  const root = rootRouter(dependencies);
  const users = usersRouter(dependencies);

  routes.use('/', root);
  routes.use('/logs', logs);
  routes.use('/users', users);

  return routes;
};
