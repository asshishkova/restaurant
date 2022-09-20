function reqLoggerMiddleware(req, res, next) {
  console.log(`Request on ${new Date()}:`);
  console.log(` ${req.method} ${req.path}`);
  console.log(` Body ${JSON.stringify(req.body, null, 2)}`);
  next();
}

module.exports = reqLoggerMiddleware;
