const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const { tokenSing } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const ENGINE_DB = process.env.ENGINE_DB;
var usuarioLogueado = [];
const registerCtrl = async (req, res) => {
  var user;
  req = matchedData(req);
  user = await usersModel.findOne({
    where: { email: req.email },
  });
  console.log(user + ' is registered')
  if (!user) {
    try {
      //req = matchedData(req);
      const password = await encrypt(req.password);
      const body = { ...req, password };
      const dataUser = await usersModel.create(body);
      console.log(req);
      dataUser.set("password", undefined, { strict: false });
      const data = {
        token: await tokenSing(dataUser),
        user: dataUser,
      };
      res.send({ data });
    } catch (error) {
      // console.log(req)
      handleHttpError(res.send ("ERROR_REGISTER_USER"));
    }
  } else {
    handleHttpError(res, "USER_MAIL_EXISTS",  404);
    return;
   // res.send('user register')
  }
};
/// cntrola el resultado de login
const loginCtrl = async (req, res) => {
  var user = "";
  try {
    req = matchedData(req);
    if (ENGINE_DB != "mysql") {
      user = await usersModel.findOne({ email: req.email });
    } else {
      user = await usersModel.findOne({
        where: { email: req.email },
      });
    }

    // console.log(req)

    if (!user) {
      handleHttpError(res, "USER_NO_EXISTS", 401);
      return;
    }
    const hashPassword = user.password;
    console.log(hashPassword);
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 404);
      return;
    }
    user.set("password", undefined, { strict: false });
    user.set("email", undefined, { strict: false });
    const data = {
      token: await tokenSing(user),
      user,
    };
    usuarioLogueado = data;
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl, usuarioLogueado };
