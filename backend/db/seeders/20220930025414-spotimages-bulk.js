'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "url1",
        preview: true
      },
      {
        spotId: 3,
        url: "url2",
        preview: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("SpotImages")
  }
};
