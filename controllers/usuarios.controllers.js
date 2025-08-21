const { token } = require("morgan");
const userServices = require("../services/usuarios.services");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
  try {
    const { errors } = validationResult(req);

    if (errors.length) {
      return res.status(400).json({ message: errors[0].msg });
    }

    const { body } = req;

    const response = await userServices.registerUser(body);

    // if (response.status === 400) {
    //   return res.status(400).json({ message: response.message });
    // } else if (response.status === 409){
    //   return res.status(409).json({ message: response.message });
    // }

    res.status(201).json({
      message: response.message,
      data: response.user,
    });

  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Error al crear el usuario",
      error: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userServices.loginUser(req.body);

    if (result.status === 400) {
      res.status(400).json({
        message: result.message,
      });
    } else {
      res.status(200).json({
        status: result.status,
        message: result.message,
        token: result.token
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error loguear el usuario",
      error: e.message,
    });
  } 
};

const getUsers = async (req, res) => {
  try {
    const usuarios = await userServices.getAllUsers();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: e.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { errors } = validationResult(req);

    if (errors.length) {
      return res.status(400).json({ message: errors[0].msg });
    }

    const { idUser } = req.params;
    const user = await userServices.getUser(idUser);
    res.status(200).json(user);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: e.message });
  }
};

const deleteUserFisically = async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await userServices.delUserFisically(idUser);

    res.status(200).json({
      message: "Usuario eliminado fisicamente con exito",
      data: response,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: e.message });
  }
};

const deleteUserLogically = async (req, res) => {
  try {
    const { idUser } = req.params;

    const response = await userServices.delUserLogically(idUser);
    res.status(200).json({
      message: "Usuario dado de baja/alta",
      data: response,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al cambiar estado del usuario",
      error: e.message,
    });
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  deleteUserFisically,
  deleteUserLogically,
};
