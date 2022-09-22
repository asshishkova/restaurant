function responseLoggerMiddleware(req, res, next) {
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
    } catch (error) {
      body = {};
    }
    oldEnd.apply(res, arguments);

    console.log('Response status:', res.statusCode, res.statusMessage);
    console.log('Response:', JSON.stringify(body, null, 2));
  };

  next();
}

module.exports = responseLoggerMiddleware;
