const { Response } = require('../../frameworks/common/Response');

module.exports = (_dependencies) => {
  return async (_req, res, next) => {
    try {
      res.json(
        new Response({
          status: true,
          content: 'hello from the commuter-log server',
        }),
      );
      next();
    } catch (err) {
      next(err);
    }
  };
};
