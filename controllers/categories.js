const { categoriesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
//const {usuarioLogueado}= require("./auth");
const ENGINE_DB = process.env.ENGINE_DB;
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  // console.log(usuarioLogueado +" sdfaf")
  // var user = req.user;
  var data
  try {
   

    if (ENGINE_DB == "mysql") {
      // user.set("password", undefined, { strict: false });
      // user.set("email", undefined, { strict: false });
       data = await categoriesModel.findAll({});
      res.send({ data });
    } else {
      // user.set("password", undefined, { strict: false });
      // user.set("email", undefined, { strict: false });
       data = await categoriesModel.find({});;
      res.send({ data });
      // categoriesModel.find({}, function (err, tracks) {
      //   storageModel.populate(
      //     tracks,
      //     { path: "mediaId" },
      //     function (err, tracks) {
      //       res.status(200).send({ tracks, user });
      //     }
      //   );
      // });
    }
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = async (req, res) => {
  var data
  try {
    req = matchedData(req);
    const { id } = req;
    if (ENGINE_DB === "mysql") {
         data = await categoriesModel.findOneData(id);
      console.log(req);
      res.send({ data });
    } else {
      data = await categoriesModel.findById(id);
      console.log(req);
      res.send({ data });
      // categoriesModel.findById(id, function (err, tracks) {
      //   storageModel.populate(
      //     tracks,
      //     { path: "mediaId" },
      //     function (err, tracks) {
      //       res.status(200).send({ tracks });
      //     }
      //   );
      // });
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

   // console.log(body.name);
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
