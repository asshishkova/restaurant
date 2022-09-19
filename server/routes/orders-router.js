const express = require('express');
const {
  getLastDayOrders,
  postNewOrder,
} = require("../controller/orders-controller");

const ordersRouter = express.Router();

ordersRouter.get('/orders', getLastDayOrders);
ordersRouter.post('/orders', postNewOrder);

module.exports = ordersRouter;
