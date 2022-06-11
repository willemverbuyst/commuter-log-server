const addUserController = require('./addUser.controller');
const deleteUserController = require('./deleteUser.controller');
const getUserByIdController = require('./getUserById.controller');
const getUsersController = require('./getUsers.controller');
const updateUserController = require('./updateUser.controller');

module.exports = (dependencies) => {
  return {
    addUserController: addUserController(dependencies),
    deleteUserController: deleteUserController(dependencies),
    getUserByIdController: getUserByIdController(dependencies),
    getUsersController: getUsersController(dependencies),
    updateUserController: updateUserController(dependencies),
  };
};
