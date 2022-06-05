const express = require('express');
const { logControllers } = require('../../../controllers');

module.exports = (dependencies) => {
  const router = express.Router();

  const {
    addLogController,
    deleteLogController,
    getLogByIdController,
    updateLogController,
  } = logControllers(dependencies);

  router
    .route('/')
    .post(addLogController)
    .delete(deleteLogController)
    .put(updateLogController);
  router.route('/:id').get(getLogByIdController);

  return router;
};
