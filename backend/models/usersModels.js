// ==================== Definición del Modelo de Datos de "User" en la base de datos MongoDB ==============================

// Importación de Mongoose para interactuar con Mongo DB
const mongoose = require('mongoose');                           // Importación del módulo mongoose para interactuar con MongoDB

// ---------------- Definición del esquema de usuario (User)
const userSchema = mongoose.Schema({                            // Definición del esquema de usuario. Mongo Automáticamente agrega un campo _id único
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
    timestamps: true                                            // Agrega campos de fecha de creación (CreatedAt) y actualización (UpdatedAt) automáticamente
});

// Exportar el Modelo de Datos de "User" para que pueda ser utilizado en otros archivos. "Siempre debe ponerse el nombre del Modelo, la primera letra en mayúscula"
module.exports = mongoose.model('User', userSchema);            // Modelo de usuario "User" basado en el esquema definido

