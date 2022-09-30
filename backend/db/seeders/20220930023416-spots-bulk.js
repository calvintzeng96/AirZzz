'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "111 address",
        city: "First City",
        state: "State1",
        country: "Country1",
        lat: 11.111111,
        lng: -11.111111,
        name: "houseName1",
        description: "description of spot 1",
        price: 111,
      },
      {
        ownerId: 1,
        address: "222 address",
        city: "Second City",
        state: "State2",
        country: "Country1",
        lat: 22.222222,
        lng: -22.222222,
        name: "houseName2",
        description: "description of spot 2",
        price: 222,
      },
      {
        ownerId: 3,
        address: "333 address",
        city: "Third City",
        state: "State3",
        country: "Country1",
        lat: 33.333333,
        lng: -33.333333,
        name: "houseName3",
        description: "description of spot 3",
        price: 333,
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots")
  }
};
