(req, res) => {
  res.send({ Respuesta: "Se almaceno con exito!!" });
};
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`
const { storageModel } = require("../models");
const { matchedData } = require("express-validator");
fs = require("fs")
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  try {
    const data = await storageModel.findAllData({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_LIST_ITEMS");
  }
  
};
const getItem =async(req, res) => {
  try {
    
    req = matchedData (req);
    const {id} = req; 
    const data = await storageModel.findById(id);
    console.log(req)
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    console.log(file);
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
    }
    const resultado = await storageModel.create(fileData);
    res.send({ resultado });
  } catch (error) {
    handleHttpError(res, "ERROR_FILE_NOT_FOUND", error);
  }

};
const updateItem = (req, res) => {};
const deleteItem = async (req, res) => {
  try {
    
    req = matchedData (req);
    const {id} = req; 
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne(id)

    const {filename} = dataFile
    const filePath = `${MEDIA_PATH}/${filename}`
    console.log(id)
   
    fs.unlinkSync(filePath); 
    const data = {
      filePath,
      delete:1
    }
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_ELIMINA_FILE");
  } 

};

module.exports = {
  updateItem,
  deleteItem,
  createItem,
  getItems,
  getItem,
};
