(req, res) => {
  res.send({ Respuesta: "Se almaceno con exito!!" });
};
const PUBLIC_URL = process.env.PUBLIC_URL
const { storageModel } = require("../models");
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  const data = await storageModel.find({});

  res.send({ data });
};
const getItem = (req, res) => {};

const createItem = async (req, res) => {
  const { body, file } = req;
  console.log(file);
  const fileData = {
      filename: file.filename,
      url:`${PUBLIC_URL}/${file.filename}`
  }
  const resultado = await storageModel.create(fileData);
  res.send({ resultado });
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
