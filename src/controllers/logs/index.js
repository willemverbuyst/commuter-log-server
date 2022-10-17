const addDummyLogsController = require('./addDummyLogs.controller');
const addLogController = require('./addLog.controller');
const deleteLogController = require('./deleteLog.controller');
const getLogByIdController = require('./getLogById.controller');
const getLogsController = require('./getLogs.controller');
const updateLogController = require('./updateLog.controller');

module.exports = (dependencies) => {
  return {
    addDummyLogsController: addDummyLogsController(dependencies),
    addLogController: addLogController(dependencies),
    deleteLogController: deleteLogController(dependencies),
    getLogByIdController: getLogByIdController(dependencies),
    getLogsController: getLogsController(dependencies),
    updateLogController: updateLogController(dependencies),
  };
};
