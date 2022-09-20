const { Order } = require('../db/models');
const { Op } = require('sequelize');

async function getLastDayOrders() {
  const minOrderTime = new Date();
  minOrderTime.setDate(minOrderTime.getDate() - 1);
  return await Order.findAll({
    attributes: {
      exclude: ['updatedAt']
    },
    where: {
      createdAt: {
        [Op.gte]: minOrderTime
      }
    },
    order: [['createdAt', 'DESC']]
  });
}

async function postNewOrder(body) {
  const newOrder = await Order.create({
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerAddress: body.customerAddress,
    orderItems: body.orderItems,
    totalCost: calculateTotalCost(body.orderItems)
  });
  return {
    id: newOrder.id,
    customerName: newOrder.customerName,
    customerPhone: newOrder.customerPhone,
    customerAddress: newOrder.customerAddress,
    orderItems: newOrder.orderItems,
    totalCost: newOrder.totalCost,
    createdAt: newOrder.createdAt
  };
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
