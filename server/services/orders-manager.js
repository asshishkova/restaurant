const { Order } = require('../db/models');
const { Op } = require('sequelize');

async function getLastDayOrders() {
  const minOrderTime = new Date();
  minOrderTime.setDate(minOrderTime.getDate() - 1);
  return await Order.findAll({
    where: {
      createdAt: {
        [Op.gte]: minOrderTime
      }
    },
  });
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
