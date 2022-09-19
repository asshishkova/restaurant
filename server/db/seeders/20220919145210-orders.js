'use strict';

const faker = require('faker');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const ordersJSON = [];
    for(let i = 0; i < 10; i++){
      // const date = faker.date.recent();
      const date = (i % 2 === 1) ? faker.date.past() : faker.date.recent();
      // if (i % 2 === 1) date. setDate(date. getDate() - randomInt(1, 3));
      const price = randomInt(40, 120);
      ordersJSON.push({
        customerName: faker.name.firstName(),
        customerPhone: faker.phone.phoneNumber(),
        customerAddress: `${faker.address.streetAddress()}, ${faker.address.secondaryAddress()}`,
        orderItems: JSON.stringify([{ itemName: "random dish", itemPrice: price }]),
        totalCost: price,
        createdAt: date,
        updatedAt: date
      });
    }
    await queryInterface.bulkInsert('Orders', ordersJSON, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
