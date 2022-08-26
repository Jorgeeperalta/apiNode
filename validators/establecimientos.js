const { check, validationResult } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;
var validatorCreateItem = [];
if (ENGINE_DB === "mysql") {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("ubicacion").exists().notEmpty(),
    check("lat").exists().notEmpty(),
    check("lng").exists().notEmpty(),
    check("fkimagen").exists().notEmpty(),
    check("delivery").exists().notEmpty(),
    check("horario").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("fkpais").exists().notEmpty(),
    check("tipo").exists().notEmpty(),
    check("fkprovincia").exists().notEmpty(),
    check("fklocalidad").exists().notEmpty(),
    check("fkusuario").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
} else {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("ubicacion").exists().notEmpty(),
    check("fkpais").exists().notEmpty(),
    check("fkprovincia").exists().notEmpty(),
    check("fklocalidad").exists().notEmpty(),
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

module.exports = { validatorCreateItem, validatorGetItem };
