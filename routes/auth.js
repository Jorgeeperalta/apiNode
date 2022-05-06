const express = require("express");
const customHeader = require("../middleware/customHeader");
const { tokenSing } = require("../utils/handleJwt");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { registerCtrl,loginCtrl } = require("../controllers/auth");

router.post("/register",validatorRegister, registerCtrl);
router.post("/login", validatorLogin,loginCtrl);

module.exports = router;
