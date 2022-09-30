'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Reviews", [
    {
      spotId: 2,
      userId: 2,
      review: "review1",
      stars: 3
    },
    {
      spotId: 3,
      userId: 2,
      review: "review2",
      stars: 4
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews")
  }
};
