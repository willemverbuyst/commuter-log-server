const express = require('express');

const app = express();

const routes = require('./frameworks/expressSpecific/routes');

const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const dependencies = require('./config/dependencies');

const PORT = process.env.PORT || 4000;

const ErrorHandler = require('./frameworks/expressSpecific/ErrorHandler');

module.exports = {
  start: () => {
    // middlewares
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    // routes
    app.use(API_PREFIX, routes(dependencies));

    app.use(ErrorHandler);

    // common error handler
    app.listen(PORT, () => {
      console.log('Server is running on port: ', PORT);
    });
  },
};
