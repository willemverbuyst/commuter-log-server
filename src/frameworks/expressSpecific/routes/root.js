const express = require('express');
const { rootControllers } = require('../../../controllers');

module.exports = (dependencies) => {
  const router = express.Router();

  const { getRootController } = rootControllers(dependencies);

  router.route('/').get(getRootController);

  return router;
};
