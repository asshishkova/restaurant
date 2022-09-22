function responseBodyMiddleware(req, res, next) {
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks = [];

  res.write = function(chunk) {
    chunks.push(chunk);
    return oldWrite.apply(res, arguments);
  };

  res.end = function(chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      res.__custombody__ = body;
    } catch (error) {
      body = {};
    }
    oldEnd.apply(res, arguments);
  };
  next();
}

module.exports = responseBodyMiddleware;
