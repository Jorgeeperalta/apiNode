const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");


const Categories = sequelize.define(
  "categories",
  {
    localidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Implementando modelo personalizado
 */

Categories.findAllData = function () {
  Categories.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Categories.findAll({ include: "audio" });
};

Categories.findOneData = function (id) {
  Categories.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Categories.findOne({ where: { id }, include: "audio" });
};

// Categories.find = Categories.findAll;
// Categories.findById = Categories.findByPk;
module.exports = Categories;