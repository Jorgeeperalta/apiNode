const { check, validationResult } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;
var validatorCreateItem = [];
if (ENGINE_DB === "mysql") {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("price").exists().notEmpty(),
    check("amount").exists().notEmpty(),
    check("stock").exists().notEmpty(),
    check("categoriaId").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
} else {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("price").exists().notEmpty(),
    check("amount").exists().notEmpty(),
    check("stock").exists().notEmpty(),
    check("categoriaId").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
}

const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem };