const UserModel = require("../models/usuario.schema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { registerUserNodemailer } = require("../helpers/mensajes");

const registerUser = async (body) => {
  try {
    const userExist = await UserModel.findOne({ username: body.username });

    if (userExist) {
      throw new Error('El nombre de usuario ya existe')
    }

    if (body.role && body.role !== "user" && body.role !== "admin") {
      throw new Error('El rol ingresado no esta permitido')
    }

    const salt = await bcrypt.genSalt(12);
    body.password = await bcrypt.hash(body.password, salt);

    await registerUserNodemailer(body.username);
    const user = new UserModel(body);
    await user.save();
    return {
      message: "Usuario creado con éxito",
      user,
    };
  } catch (e) {
    throw e;
  }
};

const loginUser = async (body) => {
  try {
    const existUser = await UserModel.findOne({ username: body.username });

    if (!existUser) {
      return {
        status: 400,
        message: "Usuario y/o Password incorrectos",
      };
    }

    const passwordVerification = await bcrypt.compare(
      body.password,
      existUser.password
    );

    if (passwordVerification) {

      const payload = {
        _id: existUser._id,
        username: existUser.username,
        role: existUser.role,
        blocked: existUser.blocked,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

      return {
        status: 200,
        message: 'El usuario inicio sesion con éxito',
        token,
      };

    } else {
      return {
        status: 400,
        message: "Usuario y/o Password incorrectos",
      };
    }
  } catch (e) {
    throw e;
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find();

    return users;
  } catch (e) {
    throw e;
  }
};

const getUser = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (e) {
    throw e;
  }
};

const delUserFisically = async (id) => {
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(id);

    return deletedUser;
  } catch (e) {
    throw e;
  }
};

const delUserLogically = async (id) => {
  try {
    const user = await UserModel.findById(id);
    user.blocked = !user.blocked;

    const modifiedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return modifiedUser;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  delUserFisically,
  delUserLogically,
};
