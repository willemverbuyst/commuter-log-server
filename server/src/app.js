require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./frameworks/expressSpecific/routes');

const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const dependencies = require('./config/dependencies');

const PORT = process.env.PORT || 4000;

const ErrorHandler = require('./frameworks/expressSpecific/ErrorHandler');

const { connect: connectToMongo } = require('./frameworks/database/mongo');

module.exports = {
  start: () => {
    // middlewares
    app.use(cors());
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
      connectToMongo();
    });
  },
};
