const express = require("express");
const requestLoggerMiddleware = require("./server/middleware/request-logger.js");
const responseLoggerMiddleware = require("./server/middleware/response-logger.js");

const port = 3000;
const ordersRouter = require("./server/routes/orders-router");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use([express.json(), requestLoggerMiddleware, responseLoggerMiddleware]);

app.use("/api", ordersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
