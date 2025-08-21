const ProductModel = require('../models/producto.schema')


const getAllProducts = async (limit, to) => {
  try {
    // const productos = await ProductModel.find();
    // return productos;
    const [ products, totalProducts ] = await Promise.all([
        ProductModel.find({active: true}).skip(to * limit).limit(limit), //Filtramos los elementos que cumplen con esa condicion
        ProductModel.countDocuments({ active: true }) //Se puede poner una condicion para que cuente unicamente algunos elementos
    ]) //Paginacion 

    const paginacion = {
      products,
      totalProducts
    }

    return paginacion;
  } catch (e) {
    throw e;
  }
};

const getProduct = async (id) => {
  try {
    const producto = await ProductModel.findOne({ _id: id});
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    return producto;
  } catch (e) {
    throw e;
  }
};

const createNewProduct = async (body) => {
  try {
    
    if (body.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0')
    }

    const newProduct = new ProductModel(body);
    await newProduct.save();
    return newProduct;   
  } catch (error) {
    throw error;
  }
};

const modifyProduct = async (id, body) => {
  try {

    if (body.precio <= 0) {
      throw new Error('El precio del producto debe ser mayor a 0')
    }
    
    const modifiedProduct = await ProductModel.findByIdAndUpdate(id, body, {new: true}); //El tercer parametro sirve para poder ver los cambios en tiempo real
    return modifiedProduct;
  } catch (e) {
    throw e;
  }
};

const deleteProductById = async (id) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id)

    return{
      deletedProduct,
      status: 200,
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createNewProduct,
  modifyProduct,
  deleteProductById
};

