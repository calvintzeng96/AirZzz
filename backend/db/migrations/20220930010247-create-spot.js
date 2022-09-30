'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        allNull: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allNull: false,
        references: {
          model: "Users",
          id: "id"
        }
      },
      city: {
        type: Sequelize.STRING,
        allNull: false
      },
      state: {
        type: Sequelize.STRING,
        allNull: false
      },
      country: {
        type: Sequelize.STRING,
        allNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        allNull: false
      },
      lng: {
        type: Sequelize.FLOAT,
        allNull: false
      },
      name: {
        type: Sequelize.STRING,
        allNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DOUBLE(7,2),
        allNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
    await queryInterface.addIndex("Spots", ["address", "city"], {
      unique: true
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
