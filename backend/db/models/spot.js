'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        { foreignKey: "ownerId", as: "Owner" }
      )
      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId",
          OnDelete: "CASCADE",
          hooks: true
        }
      )
      // Spot.belongsToMany(
      //   models.User,
      //   {
      //     through: models.Booking,
      //     foreignKey: "spotId",
      //     otherKey: "userId"
      //   }
      // )
      Spot.hasMany(
        models.Booking,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        },
      )
      // Spot.belongsToMany(
      //   models.User,
      //   {
      //     through: models.Review,
      //     foreignKey: "spotId",
      //     otherKey: "userId"
      //   }
      // )
      Spot.hasMany(
        models.Review,
        {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true
        },
      )
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DOUBLE(7, 2),
      allNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    indexes: [{ unique: true, fields: ["address", "city"] }],

  });
  return Spot;
};
