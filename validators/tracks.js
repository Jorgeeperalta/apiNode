const { check, validationResult } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ENGINE_DB = process.env.ENGINE_DB;
var validatorCreateItem = [];
if (ENGINE_DB === "mysql") {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty(),
    check("artist_name").exists().notEmpty(),
    check("artist_nickname").exists().notEmpty(),
    check("artist_nationality").exists().notEmpty(),
    check("duration_start").exists().notEmpty(),
    check("duration_end").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
} else {
  validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("artist.nickname").exists().notEmpty(),
    check("artist.nationality").exists().notEmpty(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty(),
    check("duration.end").exists().notEmpty(),
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
