const { Order } = require('../db/models');

async function getLastDayOrders() {
  return await Order.findAll();
}

async function postNewOrder(body) {
  return await Order.create({
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerAddress: body.customerAddress,
    orderItems: body.orderItems,
    totalCost: calculateTotalCost(body.orderItems)
  });;
}

function calculateTotalCost(orderItems) {
  let totalCost = 0;
  for (let item of orderItems) {
    totalCost += item.itemPrice;
  }
  return totalCost;
}

module.exports = {
  getLastDayOrders,
  postNewOrder
};
