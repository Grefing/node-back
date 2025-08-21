const { check } = require("express-validator");

const createUserValidations = [
  check("username", "Campo USERNAME esta vacio").not().isEmpty(),
  check("username", "min: 5 caracteres y max: 40 caracteres").isLength({
    min: 5,
    max: 40,
  }),
  check("password", "Campo PASSWORD esta vacio").not().isEmpty(),
  check("password", "min: 8 caracteres y max: 50 caracteres").isLength({
    min: 8,
    max: 50,
  }),
];

const getUserByIdValidation = [
  check("idUser", "Formato ID incorrecto").isMongoId(),
];

module.exports = {
  createUserValidations,
  getUserByIdValidation
};
