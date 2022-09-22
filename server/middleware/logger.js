const morgan = require('morgan');

morgan.token('responseBody', function (req, res) {
  if (res['statusCode'] >= 400) {
      return JSON.stringify(res['__custombody__'], null, 2) || null;
  }
  return null;
});

const loggerMiddleware = morgan(':method :url :status - :response-time ms :responseBody')
module.exports = loggerMiddleware;
