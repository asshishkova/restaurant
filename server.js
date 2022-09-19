const express = require("express");
// require('express-async-errors');

const port = 3000;
const ordersRouter = require("./server/routes/orders-router");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
// app.use([express.json(), requestLoggerMiddleware]);
// app.use(errorHandler);

app.use("/api", ordersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Move to middleware?
// process.on('unhandledRejection', (reason, promise) => {
//     console.log("Unhandled Rejection", reason.message);
//     throw reason;
// });
// process.on('uncaughtException', (error) => {
//     console.log("Uncaught Exception", error.message);
//     process.exit(1);
// });

// const requestLoggerMiddleware = require("./middleware/request-logger.js");
// const errorHandler = require("./middleware/error-handler.js");
// require('express-async-errors');

module.exports = app;
