const ordersManager = require("../services/orders-manager");
// const { ErrorIfNaN, ErrorIfNotFound } = require("../../common-errors");

async function getLastDayOrders(req, res) {
  let personalAnswers = await ordersManager.getLastDayOrders();
  if (!personalAnswers) personalAnswers = [];
  res.status(200).json(personalAnswers);
}

async function postNewOrder(req, res) {
  const orders = await ordersManager.postNewOrder(req.body);
  // ErrorIfNotFound(orders);
  res.status(200).json(orders);
}

// function ErrorIfNotFound(item) {
//   if (!item) {
//     const error = Error()
//     error.statusCode = 404;
//     error.message = 'Not found';
//     throw error;
//   }
// }

module.exports = {
  getLastDayOrders,
  postNewOrder,
};
