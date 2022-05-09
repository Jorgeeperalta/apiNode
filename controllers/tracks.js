const { tracksModel, storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const user = req.user
    user.set("password", undefined, { strict: false });
    user.set("email", undefined, { strict: false });
  // const data = await tracksModel.find({});

   tracksModel.find({}, function (err, tracks) {
      storageModel.populate(tracks, { path: "mediaId" }, function (err, tracks) {
        res.status(200).send({ tracks, user });
      });
    });

  // res.send({ data, user });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem  = async (req, res) => {
  try {
    
    req = matchedData (req);
    const {id} = req; 
    const data = await tracksModel.findById(id);
    console.log(req)
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    
    const resultado = await tracksModel.create(body);
    res.send({ resultado });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};
const updateItem = async (req, res) => {
  try {
    
    const body =matchedData  (req);
    const {id} = body
    const resultado = await tracksModel.findOneAndUpdate(
      id,body
    );
    console.log(id, body)
    res.send({ resultado });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }    
};
const deleteItem = async (req, res) => {
  try {
    
    req = matchedData (req);
    const {id} = req; 
    const data = await tracksModel.delete({_id:id});
    console.log(id)
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
