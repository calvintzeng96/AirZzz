'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 1,
        url: "url1"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ReviewImages")
  }
};
