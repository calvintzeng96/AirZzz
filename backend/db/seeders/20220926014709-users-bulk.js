"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "username1",
        firstName: "Adam",
        lastName: "Alast",
        email: "email1@gmail.com",
        hashedPassword: bcrypt.hashSync("password1"),
      },
      {
        username: "username2",
        firstName: "Brandon",
        lastName: "Blast",
        email: "email2@gmail.com",
        hashedPassword: bcrypt.hashSync("password2"),
      },
      {
        username: "username3",
        firstName: "Charlie",
        lastName: "Clast",
        email: "email3@gmail.com",
        hashedPassword: bcrypt.hashSync("password3"),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users")
  }
};
