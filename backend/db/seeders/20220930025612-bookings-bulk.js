'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("11-11-2011"),
        endDate: new Date("11-22-2011"),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings")
  }
};
