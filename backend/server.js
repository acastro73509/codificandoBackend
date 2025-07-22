// backend/server.js
// Este archivo es el punto de entrada del servidor Express, donde se configuran las rutas y   
// middlewares, y se inicia el servidor en un puerto específico.
// Se importan los módulos necesarios y se configuran las rutas de la API.
const express = require('express');                         // Importación del módulo de express
const colors = require('colors');                           // Importación del módulo de colors para colorear la salida de la consola
const dotenv = require('dotenv').config();                  // Importación del módulo de dotenv para usar variables de entorno (.env)
const connectDB = require('./config/db');                   // Importación de la función de conexión a la base de datos MongoDB
const errorHandler = require('./middleware/errorMiddleware'); // Importación del middleware de manejo de errores
// Configuración de la variable de entorno PORT, si no se encuentra, se usa el puerto 5000
// Esto permite que el servidor escuche en el puerto especificado en la variable de entorno o
// en el puerto 5000 por defecto si no se ha definido.
const port = process.env.PORT || 5000;                      // Tomar el valor de la variable de entorno PORT o 5000 si no se encuentra
// Conexión a la base de datos MongoDB
connectDB();                                                // Llamada a la función de conexión a la base de datos MongoDB, que se encuentra en el archivo ./config/db.js
// Crear una instancia de la aplicación Express
// Esta instancia se utiliza para definir las rutas y middlewares del servidor.
const app = express();                                      // Crear una instancia de express
// Configuración de middlewares de la aplicación de Express
// Estos middlewares se encargan de procesar las solicitudes entrantes antes de que lleguen
app.use(express.json());                                    // Middleware para parsear datos de JSON
app.use(express.urlencoded({ extended: false }));           // Middleware para parsear datos de formularios URL-encoded, usa QueryString, urlencoded indica que se pueden enviar datos en el cuerpo de la petición
// Aquí empieza la configuración de las rutas del browser, que archivos los procesarán, normalmente en la carpeta routes
app.use('/api/tareas', require('./routes/tareasRoutes'));   // Importación de la ruta del browser /api/tareas hacia el archivo de rutas ./routes/tareasRoutes.js
// Configuración del middleware de manejo de errores
app.use(errorHandler);                                      // Middleware para manejar errores, se coloca al final de todas las
                                                            // rutas para capturar cualquier error que ocurra en las rutas anteriores
// Aquí se inicia el proceso de arranque del servidor, se le indica el puerto y se le da un mensaje de inicio
app.listen(port, () => console.log(`Servidor iniciado en el Puerto ${port}`));  // Arranque del servidor y login al número de puerto
