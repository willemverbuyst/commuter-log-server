const express = require('express');
const { userControllers } = require('../../../controllers');

module.exports = (dependencies) => {
  const router = express.Router();

  const {
    addUserController,
    deleteUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
  } = userControllers(dependencies);

  router
    .route('/')
    .get(getUsersController)
    .post(addUserController)
    .delete(deleteUserController)
    .put(updateUserController);
  router.route('/:id').get(getUserByIdController);

  return router;
};
