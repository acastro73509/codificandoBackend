// Este archivo es el punto de entrada del servidor Express, donde se configuran las rutas y  middlewares, y se inicia el servidor en un puerto específico.

// Se importan los módulos necesarios y se configuran las rutas de la API.
const express = require('express');                         // Importación del módulo de express
const colors = require('colors');                           // Importación del módulo de colors para colorear la salida de la consola
const dotenv = require('dotenv').config();                  // Importación del módulo de dotenv para usar variables de entorno (.env)
const connectDB = require('./config/db');                   // Importación de la función de conexión a la base de datos MongoDB
const errorHandler = require('./middleware/errorMiddleware'); // Importación del middleware de manejo de errores
const cors = require('cors');                             // Importación del módulo cors para habilitar CORS

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());                                            // Habilita CORS para todas las rutas y orígenes

// Configuración de la variable de entorno PORT, si no se encuentra, se usa el puerto 5000
const port = process.env.PORT || 5000;                      // Tomar el valor de la variable de entorno PORT o 5000 si no se encuentra

// Conexión a la base de datos MongoDB
connectDB();                                                // Llamada a la función de conexión a la base de datos MongoDB, que se encuentra en el archivo ./config/db.js

// Crear una instancia de la aplicación Express, esta se utiliza para definir las rutas y middlewares del servidor.
const app = express();                                      // Crear una instancia de express

// Configuración de middlewares de Express
app.use(express.json());                                    // Middleware para parsear datos de JSON
app.use(express.urlencoded({ extended: false }));           // Middleware para parsear datos de formularios URL-encoded, usa QueryString, urlencoded indica que se pueden enviar datos en el cuerpo de la petición

// Configuración de las rutas del browser, normalmente en la carpeta routes
app.use('/api/tareas', require('./routes/tareasRoutes'));   // /api/tareas hacia el archivo de rutas ./routes/tareasRoutes.js
app.use('/api/users', require('./routes/usersRoutes'));     // /api/users hacia el archivo de rutas ./routes/usersRoutes.js

// Configuración del middleware de manejo de errores
app.use(errorHandler);                                      // Se coloca al final de todas las rutas para capturar cualquier error que ocurra en las rutas anteriores

// Aquí se inicia el proceso de arranque del servidor, se le indica el puerto y se le da un mensaje de inicio
app.listen(port, () => console.log(`Servidor iniciado en el Puerto ${port}`));  // Arranque del servidor y login al número de puerto
