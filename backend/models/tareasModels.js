// ==================== Definición del Modelo de Datos de "Tareas" en la base de datos MongoDB ==============================

// Importación de Mongoose para interactuar con Mongo DB
const mongoose = require('mongoose');                           // Importación del módulo mongoose para manejar la conexión a MongoDB

// ---------------- Definición del esquema de Tarea
const tareaSchema = mongoose.Schema({                           // Definición del esquema de tarea. Mongo Automáticamente agrega un campo _id único
    //Agregamos los campos de usuario a los que pertenece la tarea
    user: {
        type: mongoose.Schema.Types.ObjectId,                   // Tipo de dato ObjectId de Mongoose para referenciar al usuario
        required: true,                                         // Campo obligatorio
        ref: 'User'                                             // Referencia al modelo User
    },
    // Campos de la tarea
    descripcion: {
        type: String,
        required: [true, 'Por favor teclea una descripción']
    }
},{
    timestamps: true                                            // Agrega campos de fecha de creación y actualización
});

// Exportar el Modelo de Datos de "Tarea" para que pueda ser utilizado en otros archivos. "Siempre debe ponerse el nombre del Modelo, la primera letra en mayúscula"
module.exports = mongoose.model('Tarea', tareaSchema);  // Exporta el modelo de la tarea para que pueda ser utilizado en otros archivos
