const { categoriesModel } = require("../models");
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
 
  var data
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
          "SELECT categories.id, categories.name,  categories.fkusuario, storages.id, storages.url FROM categories INNER JOIN storages ON categories.fkimagen = storages.id",
          function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send({ result});
          }
        );
      });
    // SELECT categories.id, categories.name, storages.id, storages.url FROM categories INNER JOIN storages ON categories.fkimagen = storages.id
     //  data = await categoriesModel.findAll({});
     // res.send({ data });
    } else {
     
       data = await categoriesModel.find({});;
      res.send({ data });
    
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
          "SELECT categories.id, categories.name,  categories.fkusuario, storages.id, storages.url  FROM categories INNER JOIN storages ON categories.fkimagen = storages.id WHERE categories.fkusuario = "+id,
          function (err, result, fields) {
            if (err) throw err;
            console.log(id);
            res.send({ result});
          }
        );
      });
      
    


    } else {
      data = await categoriesModel.findById(id);
      console.log(req);
      res.send({ data });
     
    }
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);

    const resultado = await categoriesModel.create(body);
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
      resultado = await categoriesModel.upsert({
        id: id,
        name: body.name,
      });
    } else {
      resultado = await categoriesModel.findOneAndUpdate(id, body);
    }

  
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
      data = await categoriesModel.destroy({ where: { id } });
    } else {
      data = await categoriesModel.deleteOne({ _id: id });
    }
   
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
