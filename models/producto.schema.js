const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria'],
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    active:{
        type: Boolean,
        default: true
    }
})

const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel