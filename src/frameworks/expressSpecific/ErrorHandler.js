const { Response, ResponseError } = require('../common');

module.exports = (err, req, res, next) => {
  const error = new ResponseError({
    status: err.status || 500,
    msg: err.msg || err.message || 'No message',
    reason: err.reason || err.stack || 'Something failed!',
    url: req.originalUrl,
    ip: req.ip,
    validationErrors: err.validationErrors || [],
  });

  res.status(error.status);
  res.json(new Response({ status: false, error }));
};
