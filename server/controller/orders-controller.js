const ordersManager = require('../services/orders-manager');
// const { ErrorIfNaN, ErrorIfNotFound } = require('../../common-errors');

async function getLastDayOrders(req, res) {
  try {
    let personalAnswers = await ordersManager.getLastDayOrders();
    if (!personalAnswers) personalAnswers = [];
    res.status(200).json(personalAnswers);
  } catch (error) {
    res.status(500).json('Internal server error :)');
  }

}

async function postNewOrder(req, res) {
    const order = await ordersManager.postNewOrder(req.body);
    res.status(201).json(order);
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
