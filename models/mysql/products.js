const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");
const Categories = require("./categories");

const Products = sequelize.define(
  "productsses",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    detalle: {
      type: DataTypes.STRING,
    },
    categoriaId: {
      type: DataTypes.STRING,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
    fkusuario: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementando modelo personalizado
 */

// Products.findAllData = function () {
//   Products.belongsTo(Storage, {
//     foreignKey: "mediaId",
//     as: "audio",
//   },
//   Products.belongsTo(Categories, {
//     foreignKey: "categoriaId",
//     as: "categoria",
//   }))

//   return Products.findAll({ include: "categoria "});
// };
Products.findAllData = function () {
  Products.hasMany(Storage, {
    foreignKey: "mediaId",
    as: "audio",
    constraints: false,
    scope: {
      commentable: "products",
    },
  });
  Products.belongsTo(Categories, {
    foreignKey: 'categoriaId',
    constraints: false,
    as: 'categoria'
  });
  

  return Products.findAll({});
};
//  Products.findAllData= function () {
//   include: [{
//     model: Storage,
//     foreignKey: "mediaId",
//     as: "audio",
//     include: [{
//       model: Categories,
//       foreignKey: "categoriaId",
//       as: "categoria",
//     }]
//   }]

//   return Products.findAll({});
// }

// ;

Products.findOneData = function (id) {
  Products.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Products.findOne({ where: { id }, include: "audio" });
};
//
// Tracks.find = Tracks.findAll;
// Tracks.findById = Tracks.findByPk;
module.exports = Products;
