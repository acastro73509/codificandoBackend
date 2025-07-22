// Se importan los módulos necesarios para utilizar Mongo DB.
const mongoose = require('mongoose');                                   // Importación del módulo mongoose para manejar la conexión a MongoDB

// Conexión a la base de datos MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);                                                    // Termina el proceso si hay un error de conexión
  }
}

module.exports = connectDB;                                             // Exporta la función connectDB para que pueda ser utilizada en otros archivos
