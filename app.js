const express = require('express');
const errorHandler = require('./server/middleware/error-handler.js');
require('express-async-errors');
const responseBodyMiddleware = require('./server/middleware/response-body.js');
const lastModifiedMiddleware = require('./server/middleware/last-modified.js');
const loggerMiddleware = require('./server/middleware/logger.js');

const ordersRouter = require('./server/routes/orders-router');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use([
  express.json(),
  responseBodyMiddleware,
  lastModifiedMiddleware,
]);

app.use('/api', loggerMiddleware, ordersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

module.exports = app;
