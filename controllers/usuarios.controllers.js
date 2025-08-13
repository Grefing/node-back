let usuarios = [
  {
    id: 1,
    username: "Juan123",
    email: "juan123@gmail.com",
    password: "123456",
  },
];

const createUser = (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existUsername = usuarios.find((user) => user.username === username);
    const existEmail = usuarios.find((user) => user.email === email);

    if (existUsername) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya existe" });
    } else if (existEmail) {
      return res.status(400).json({ message: "El email ya existe" });
    }

    const newUser = {
      //   id: crypto.randomUUID(),
      id: usuarios.length + 1,
      baja: false,
      username,
      email,
      password,
    };

    usuarios.push(newUser);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({
      msg: "Error al crear el usuario",
    });
  }
};

const getUsers = (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = usuarios.find((user) => user.id === parseInt(id));
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    }

    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

const getUserById = (req, res) => {
  try {
    const { idUser } = req.params;
    const user = usuarios.find((user) => user.id === parseInt(idUser));

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

const deleteUserFisically = (req, res) => {
  try {
    const { idUser } = req.params;
    const user = usuarios.find((user) => user.id === parseInt(idUser));

    if (!user) {
      return res
        .status(404)
        .json({ message: "El usuario que desea eliminar no existe" });
    } else {
      const position = usuarios.findIndex(
        (user) => (user.id = parseInt(idUser))
      );
      usuarios.splice(position, 1);
      return res.status(200).json(usuarios);
    }
  } catch (e) {
    res.status(500).json({ message: "Error al elimar el usuario" });
  }
};

const deleteUserLogically = (req, res) => {
  try {
    const { idUser } = req.params;
    const user = usuarios.find((user) => user.id === parseInt(idUser));
    
   if (!user) {
    return res.status(404).json({message: 'Usuario que desea dar de baja no existe'})
   }

   user.baja = !user.baja;

   const message = user.baja ? 'Usuario dado de baja' : 'Usuario reestablecido'

   res.status(200).json({
     message: message,
     user
   })
    
    
  } catch (e) {
    res.status(500).json({ message: "Error al elimar el usuario" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUserFisically,
  deleteUserLogically,
};
