const { productsModel, storageModel, categoriesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const ENGINE_DB = process.env.ENGINE_DB;
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
 
  var data;
 
  try {
    if (ENGINE_DB == "mysql") {
      var mysql = require("mysql");

      var con = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database,
      });

      con.connect(function (err) {
        if (err) throw err;
      
        con.query(
          "SELECT productsses.name,productsses.id,productsses.categoriaId,productsses.mediaId,productsses.price,productsses.amount,productsses.stock,productsses.detalle, productsses.promo, productsses.dia, productsses.plato, productsses.fkusuario"+
          ", categories.name as categoria,storages.filename,storages.url "+
          "  FROM productsses  INNER JOIN categories on productsses.categoriaId = categories.id "+
          " JOIN storages ON productsses.mediaId = storages.id",
          function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({ result });
          }
        );
      });

    
    } else {
  

      productsModel.find({}, function (err, products) {
        storageModel.populate(
          products,
          { path: "mediaId" },
          function (err, products) {
            res.status(200).send({ products });
          },
          categoriesModel.populate(products, { path: "categoriaId" })
        );
      });
    }
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = async (req, res) => {
  var data;
  try {
    
    req = matchedData(req);
    const { id } = req;
    if (ENGINE_DB === "mysql") {

      var mysql = require("mysql");

      var con = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database,
      });

      con.connect(function (err) {
        if (err) throw err;
     
        con.query(
          "SELECT productsses.name,productsses.id,productsses.categoriaId,productsses.mediaId,productsses.price,productsses.amount,productsses.stock,productsses.detalle, productsses.promo, productsses.dia, productsses.plato, productsses.fkusuario, categories.name as categoria,storages.filename,storages.url FROM productsses INNER JOIN categories on productsses.categoriaId = categories.id JOIN storages ON productsses.mediaId = storages.id WHERE productsses.fkusuario="+id,
          function (err, result, fields) {
            if (err) throw err;
            res.send({ result});
          }
        );
      });
      
    


    } else {
      data = await productsModel.findOneData(id);
      console.log(req);
      res.send({ data });
    
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const createItem = async (req, res) => {
  console.log(req);
  try {
  const body = matchedData(req);

  const resultado = await productsModel.create(body);
  res.send({ resultado });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};
const updateItem = async (req, res) => {
  var resultado;
 try {
    const body = matchedData(req);
    const { id } = body;
   if (ENGINE_DB === "mysql") {

    resultado = await productsModel.update({ id, name: body.name, price: body.price,
       amount: body.amount,stock: body.stock,detalle: body.detalle,promo: body.promo,dia: body.dia,plato: body.plato, categoriaId: body.categoriaId, mediaId: body.mediaId  }, {
      where: {
        id: id,
      
      }
    });
      
    } else {
      resultado = await productsModel.findOneAndUpdate(id, body);
    }

     console.log(id);
    res.send({ resultado });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};
const deleteItem = async (req, res) => {
  var data;
  try {
    req = matchedData(req);
    const { id } = req;
    //
    if (ENGINE_DB === "mysql") {
      data = await productsModel.destroy({ where: { id } });
    } else {
      data = await productsModel.deleteOne({ _id: id });
    }
   
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_ELIMINA_ITEM");
  }
};

const getProd = async (req, res) => {
  var fkuser = "";
  var fkestablecimiento = ""
  var fkcategoria = ''
  req = matchedData(req);
  try {

    if (ENGINE_DB === "mysql") {
      fkuser =  req.fkusuario ;
      fkestablecimiento = req.fkestablecimiento;
      fkcategoria = req.fkcategoria ;
      var mysql = require("mysql");

      var con = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database,
      });

      con.connect(function (err) {
        if (err) throw err;

        con.query(
          "SELECT productsses.name, productsses.id, productsses.price, productsses.detalle, productsses.promo, productsses.dia, productsses.plato, productsses.mediaId, storages.url , categories.id  as pk FROM productsses INNER JOIN" +
          " categories on productsses.categoriaId = categories.id INNER JOIN storages ON storages.id = productsses.mediaId  INNER JOIN establecimientos " +
          " WHERE categories.fkusuario ="+ fkuser + " AND establecimientos.id="+fkestablecimiento+" AND categories.id="+ fkcategoria,
          function (err, result, fields) {
            if (err) throw err;
            res.send({ result});
          }
        );
      });
       } 
  } catch (error) {
  
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = {
  updateItem,
  deleteItem,
  createItem,
  getItems,
  getItem,
  getProd

};
