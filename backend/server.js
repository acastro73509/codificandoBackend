const express = require('express');                         // Importación del módulo de express
const colors = require('colors');                           // Importación del módulo de colors para colorear la salida de la consola
const dotenv = require('dotenv').config();                  // Importación del módulo de dotenv para usar variables de entorno (.env)

const port = process.env.PORT || 5000;                      // Tomar el valor de la variable de entorno PORT o 5000 si no se encuentra

const app = express();                                      // Crear una instancia de express

// Configuración de middlewares
app.use(express.json());                                    // Middleware para parsear datos de JSON
app.use(express.urlencoded({ extended: false }));           // Middleware para parsear datos de formularios URL-encoded, urlencoded indica que se pueden enviar datos en el cuerpo de la petición

// Aquí empieza la configuración de las rutas del browser, que archivos los procesarán, normalmente en la carpeta routes
app.use('/api/tareas', require('./routes/tareasRoutes'));   // Importación de la ruta del browser /api/tareas hacia el archivo de rutas ./routes/tareasRoutes.js
// Middleware de manejo de errores
const errorHandler = require('./middleware/errorMiddleware'); // Importación del middleware de manejo de errores
// Aquí se inicia el proceso de arranque del servidor, se le indica el puerto y se le da un mensaje de inicio
app.listen(port, () => console.log(`Servidor iniciado en el Puerto ${port}`));  // Arranque del servidor y login al número de puerto

