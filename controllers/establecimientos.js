const {  establecimientosModel, storageModel, categoriesModel } = require("../models");
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
  var user = req.user;
  // var data;
  // user.set("password", undefined, { strict: false });
  // user.set("email", undefined, { strict: false });
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
          "SELECT * FROM establecimientos",
          function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({ result});
          }
        );
      });

    
    } else {
      user.set("password", undefined, { strict: false });
      user.set("email", undefined, { strict: false });

      establecimientosModel.find({}, function (err, products) {
        storageModel.populate(
          products,
          { path: "mediaId" },
          function (err, products) {
            res.status(200).send({ products, user });
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
          "SELECT * FROM establecimientos WHERE establecimientos.id="+id,
          function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({ result});
          }
        );
      });
      
    


    } else {
      data = await establecimientosModel.findOneData(id);
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

  const resultado = await establecimientosModel.create(body);
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

    resultado = await establecimientosModel.update({ id, name: body.name, ubicacion: body.ubicacion,
       fkpais: body.fkpais, fkprovincia: body.fkprovincia, fklocalidad: body.fklocalidad, fkusuario: body.fkusuario  }, {
      where: {
        id: id,
      
      }
    });
      
    } else {
      resultado = await establecimientosModel.findOneAndUpdate(id, body);
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
      data = await establecimientosModel.destroy({ where: { id } });
    } else {
      data = await establecimientosModel.deleteOne({ _id: id });
    }
    // console.log(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_ELIMINA_ITEM");
  }
};

module.exports = {
  updateItem,
  deleteItem,
  createItem,
  getItems,
  getItem,
};