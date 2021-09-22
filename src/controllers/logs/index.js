const addLogController = require('./addLog.controller');
const deleteLogController = require('./deleteLog.controller');
const getLogByIdController = require('./getLogById.controller');
const updateLogController = require('./updateLog.controller');

module.exports = (dependencies) => {
  return {
    addLogController: addLogController(dependencies),
    deleteLogController: deleteLogController(dependencies),
    getLogByIdController: getLogByIdController(dependencies),
    updateLogController: updateLogController(dependencies),
  };
};
