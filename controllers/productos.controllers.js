// Servicios de los productos
const { validationResult } = require("express-validator");
const productServices = require("../services/productos.services");

const getProducts = async (req, res) => {
  try {
    const { id } = req.query;
    const limit = req.query.limit || 10;
    const to = req.query.to || 0;

    if (id) {
      const producto = await productServices.getProduct(id);
      res.status(200).json(producto);
    } else {
      const result = await productServices.getAllProducts(limit, to);
      res.status(200).json(result);
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: e.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const producto = await productServices.getProduct(idProducto);

    res.json(producto);
  } catch (e) {
    if (e.message === "Producto no encontrado") {
      return res.status(404).json({ message: e.message });
    }
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: e.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { errors } = validationResult(req);

    if (errors.length) {
      return res.status(400).json({ message: errors[0].msg });
    }

    const { body } = req;

    if (!body) {
      return res
        .status(400)
        .json({ message: "Body de la petición vacío o inválido" });
    }

    const newProduct = await productServices.createNewProduct(body);

    res.status(201).json({
      message: "Producto creado correctamente",
      data: newProduct,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { errors } = validationResult(req);

    if (errors.length) {
      return res.status(400).json({ message: errors[0].msg });
    }

    const { idProducto } = req.params;
    const { body } = req;

    const updatedProduct = await productServices.modifyProduct(
      idProducto,
      body
    );

    res.status(200).json({
      message: "Producto modificado correctamente",
      data: updatedProduct,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al modificar el producto", error: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { idProducto } = req.params;

    const response = await productServices.deleteProductById(idProducto);

    if (response.status === 200) {
      return res.status(200).json({
        message: "Producto eliminado correctamente",
        data: response.deletedProduct,
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: e.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
