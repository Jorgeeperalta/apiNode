const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");
const Categories = require("./categories");

const Establecimientos = sequelize.define(
  "establecimientos",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.STRING,
    },
    fkimagen: {
      type: DataTypes.STRING,
    },
    delivery: {
      type: DataTypes.STRING,
    },
    horario: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    fkpais: {
      type: DataTypes.STRING,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    fkprovincia: {
      type: DataTypes.STRING,
    },
    fklocalidad: {
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
Establecimientos.findAllData = function () {
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
  

  return Establecimientos.findAll({});
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

Establecimientos.findOneData = function (id) {
  Products.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });
  return Products.findOne({ where: { id }, include: "audio" });
};
//
// Tracks.find = Tracks.findAll;
// Tracks.findById = Tracks.findByPk;
module.exports = Establecimientos;
