const express = require('express');                 // Importación del módulo de express
const router = express.Router();                    // Crear una instancia de express.Router para definir las rutas de la API
const { misDatos, login, registrar } = require('../controllers/usersControllers');   // Importación de los controladores de usuarios
const protect = require('../middleware/authMiddleware');                            // Importación del middleware de autenticación (descomentarlo si se necesita protección de rutas)

// Definición de las rutas para los usuarios, estas se encargan de manejar las solicitudes HTTP para los usuarios
router.post('/', registrar);                        // Ruteador para registrar un nuevo usuario por el método POST, si tiene el middleware protect, significa que la ruta está protegida y requiere autenticación
router.post('/login', login);                       // Ruteador para iniciar sesión por el método POST
router.get('/Datos', protect, misDatos);            // Ruteador para obtener los datos del usuario autenticado por el método GET

// Exportar el ruteador para que pueda ser utilizado en otros archivos
module.exports = router;                            // Esto permite que las rutas definidas aquí sean accesibles desde
