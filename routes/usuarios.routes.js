const { Router } = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  deleteUserFisically,
  deleteUserLogically,
  login,
} = require("../controllers/usuarios.controllers");
const router = Router();
const { check } = require("express-validator");
const {
  createUserValidations,
  getUserByIdValidation,
} = require("../validations/usuarios.validations");
const authenticateToken = require("../middleware/auth");

router.post("/", createUserValidations, createUser);

router.get("/", authenticateToken("admin"), getUsers);

router.post("/login", login);

router.get(
  "/:idUser",
  getUserByIdValidation,
  authenticateToken("admin"),
  getUserById
);

router.delete("/:idUser", authenticateToken("admin"), deleteUserFisically);

router.put("/:idUser", authenticateToken("admin"), deleteUserLogically);

module.exports = router;
