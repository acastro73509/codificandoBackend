// backend/models/tareasModels.js
// Este archivo define el modelo de datos para las tareas en la base de datos MongoDB.
const mongoose = require('mongoose');                           // Importación del módulo mongoose para manejar la conexión a MongoDB
// Definición del esquema de la tarea
const tareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,                   // Tipo de dato ObjectId de Mongoose para referenciar al usuario
        required: true,                                         // Campo obligatorio
        ref: 'User'                                             // Referencia al modelo User
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor teclea una descripción']
    }
},{
    timestamps: true                                            // Agrega campos de fecha de creación y actualización
});

// Exporta el modelo de la tarea para que pueda ser utilizado en otros archivos
// El modelo se llama 'Tarea' y se basa en el esquema tareaSchema definido anteriormente
module.exports = mongoose.model('Tarea', tareaSchema);  // Exporta el modelo de la tarea para que pueda ser utilizado en otros archivos
