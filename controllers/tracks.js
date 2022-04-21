const { tracksModel } = require("../models");
const { handleHttpError} = require("../utils/handleError")
const {matchedData} = require("express-validator")
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = (req, res) => {};
const createItem = async (req, res) => {
  try {

    
    const  body   =matchedData (req)

    const resultado = await tracksModel.create(body);
    res.send({ resultado });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};
const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

module.exports = {
  updateItem,
  deleteItem,
  createItem,
  getItems,
  getItem,
};
