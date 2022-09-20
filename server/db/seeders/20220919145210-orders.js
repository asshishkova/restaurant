'use strict';

const faker = require('faker');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const ordersJSON = [];
    let dates = [];
    for (let i = 0; i < 10; i++) {
      dates.push((i < 5) ? faker.date.past() : faker.date.recent());
    }
    dates = dates.sort((date1, date2) => date1 - date2);
    for(let i = 0; i < 10; i++){
      const priceDish = randomInt(40, 120);
      const priceDrink = randomInt(10, 50);
      ordersJSON.push({
        customerName: faker.name.firstName(),
        customerPhone: faker.phone.phoneNumber('+972-5#-###-##-##'),
        customerAddress: faker.address.streetAddress(true),
        orderItems: JSON.stringify([
          { itemName: "random dish", itemPrice: priceDish },
          { itemName: "random drink", itemPrice: priceDrink }
        ]),
        totalCost: priceDish + priceDrink,
        createdAt: dates[i],
        updatedAt: dates[i]
      });
    }
    await queryInterface.bulkInsert('Orders', ordersJSON, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
