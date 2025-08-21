const { Schema, model} = require('mongoose')


const UserSchema = new Schema({
    username:{
        type: String,
        required: [true, 'El nombre de usuario es un campo obligatorio'],
        unique: [true, 'El nombre de usuario ingresado ya existe'],
        trim: true //Elimina los espacios
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'] //El rol unicamente puede tomar esos dos valores
    },
    blocked: {
        type: Boolean,
        default: false,
    }
})

//Retiramos los atributos que no queremos mostrar
UserSchema.methods.toJSON = function () { 
    const {password, __v, ...user} = this.toObject();

    return user; 
}

const UserModel = model('user', UserSchema)

module.exports = UserModel