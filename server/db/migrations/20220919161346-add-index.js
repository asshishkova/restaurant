'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex(
      'Orders',
      ['createdAt'],
      {
        name: 'created_at_index',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Orders', 'created_at_index');
  }
};
