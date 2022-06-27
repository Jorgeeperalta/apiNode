const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathModels}/users`),
  
  storageModel: require(`${pathModels}/storage`),
  categoriesModel: require(`${pathModels}/categories`),
  productsModel: require(`${pathModels}/products`),
  establecimientosModel: require(`${pathModels}/establecimientos`),
  pantallasModel: require(`${pathModels}/pantallas`),
};

module.exports = models;