const mongoose = require('mongoose');                           // Importación del módulo mongoose para interactuar con MongoDB

// Definición del esquema de usuario
const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea un nombre']          // Campo obligatorio con mensaje de error personalizado
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea un email'],          // Campo obligatorio con mensaje de error personalizado
        unique: true                                            // El email debe ser único en la colección
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea una contraseña'],    // Campo obligatorio con mensaje de error personalizado
    },
    esAdministrador: {
        type: Boolean,
        default: false                                          // Por defecto, el usuario no es administrador
    }
}, {
    timestamps: true                                            // Agrega campos de fecha de creación y actualización automáticamente
});
// Exporta el modelo de usuario para que pueda ser utilizado en otros archivos
module.exports = mongoose.model('User', userSchema);            // Exporta el modelo de usuario (User) basado en el esquema definido
// El modelo se llama 'User' y se basa en el esquema userSchema definido anteriormente
