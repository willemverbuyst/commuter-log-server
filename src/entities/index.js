const { Log, logConstants } = require('./Log');
const { Product } = require('./Product');
const { User, userConstants } = require('./User');

module.exports = {
  Log,
  Product,
  User,
  constants: { userConstants, logConstants },
};
