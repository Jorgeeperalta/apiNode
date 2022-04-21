const { tracksModel } = require("../models");
/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
  const data = await tracksModel.find({});

  res.send({ data });
};
const getItem = (req, res) => {};
const createItem =async (req, res) => {
       const {body} = req 
       console.log(body);
    const resultado =   await tracksModel.create(body);
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
