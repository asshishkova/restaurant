const express = require('express');
const { validateCreateOrderSchema } =  require('../middleware/validation.js');
const {
  getLastDayOrders,
  postNewOrder,
} = require('../controller/orders-controller');

const ordersRouter = express.Router();

ordersRouter.get('/orders', getLastDayOrders);
ordersRouter.post('/orders', validateCreateOrderSchema(), postNewOrder);

module.exports = ordersRouter;
