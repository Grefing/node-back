const { check } = require("express-validator");

const createProductValidation = [
  check("nombre", "campo NOMBRE vacio").not().isEmpty(),
  check("precio", "campo PRECIO vacio").not().isEmpty(),
  check("descripcion", "campo DESCRIPCIÓN vacio").not().isEmpty(),
];

const updateProductValidation = [
  check("nombre", "campo NOMBRE vacio").not().isEmpty(),
  check("precio", "campo PRECIO vacio").not().isEmpty(),
  check("descripcion", "campo DESCRIPCIÓN vacio").not().isEmpty(),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
};
