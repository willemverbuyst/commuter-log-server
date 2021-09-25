const { Log, logConstants } = require('./Log');
const { User, userConstants } = require('./User');

module.exports = {
  Log,
  User,
  constants: { userConstants, logConstants },
};
