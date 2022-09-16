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
    check("detalle").exists().notEmpty(),
    check("categoriaId").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    check("fkusuario").exists().notEmpty(),
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
    check("detalle").exists().notEmpty(),
    check("categoriaId").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    check("fkusuario").exists().notEmpty(),
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
const validatorGetProd = [
 
  check("fkusuario").exists().notEmpty(),
  check("fkestablecimiento").exists().notEmpty(),
  check("fkcategoria").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem, validatorGetProd };
