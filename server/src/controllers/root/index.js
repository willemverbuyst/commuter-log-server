const getRootController = require('./getRoot.controller');

module.exports = (dependencies) => {
  return {
    getRootController: getRootController(dependencies),
  };
};
