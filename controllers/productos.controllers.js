
let productos = [
  {
    id: 1,
    nombre: "Producto 1",
    precio: 100,
  },
  {
    id: 2,
    nombre: "Producto 2",
    precio: 200,
  },
  {
    id: 3,
    nombre: "Producto 3",
    precio: 300,
  },
];


const getProducts = (req, res) => {
  try {
    if (req.query.id) {
      const producto = productos.find(
        (producto) => producto.id === parseInt(req.query.id)
      );
      res.status(200).json(producto);
    } else {
      res.status(200).json({
        message: "Productos obtenidos correctamente",
        data: productos,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const getProductById = (req, res) => {
  try {
    const { idProducto } = req.params;

    const producto = productos.find(
      (producto) => producto.id === parseInt(idProducto)
    );
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(producto);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const createProduct = (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const nuevoProducto = {
      id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
      nombre,
      precio,
    };
    console.log(nuevoProducto);

    productos.push(nuevoProducto);
    res.status(201).json({
      message: "Producto creado correctamente",
      data: nuevoProducto,
    });
  } catch (e) {
    res.status(500).json({ message: "Error al crear el producto", error: e });
  }
};

const updateProduct = (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const { nombre, precio } = req.body;

    const producto = productos.find((prod) => prod.id === parseInt(idProducto));

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    producto.nombre = nombre;
    producto.precio = precio;

    res.status(200).json({
      message: "Producto modificado correctamente",
      data: producto,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al modificar el producto", error: e });
  }
};

const deleteProduct = (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const producto = productos.find((prod) => prod.id === parseInt(idProducto));

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const arrayActualizado = productos.filter(
      (producto) => producto.id !== parseInt(idProducto)
    );
    productos = arrayActualizado;

    res.status(200).json({
      message: "Producto eliminado correctamente",
      data: productos,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: e });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
