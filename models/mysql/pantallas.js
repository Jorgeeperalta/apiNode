const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");


const Pantallas = sequelize.define(
  "pantallas",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mdi: {
      type: DataTypes.STRING,
    },
    color: {
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
Pantallas.findAllData = function () {
  // Products.hasMany(Storage, {
  //   foreignKey: "mediaId",
  //   as: "audio",
  //   constraints: false,
  //   scope: {
  //     commentable: "products",
  //   },
  // });
  // Pais.belongsTo(Categories, {
  //   foreignKey: 'categoriaId',
  //   constraints: false,
  //   as: 'categoria'
  // });
  

  return Pantallas.findAll({});
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

Pantallas.findOneData = function (id) {
  Pantallas.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Pantallas.findOne({ where: { id }, include: "audio" });
};
//
// Tracks.find = Tracks.findAll;
// Tracks.findById = Tracks.findByPk;
module.exports = Pantallas;
