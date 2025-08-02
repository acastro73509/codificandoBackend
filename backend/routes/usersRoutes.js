// ==================== Definición de las rutas relacionadas con los usuarios ==============================

// Importación de los módulos necesarios para la creación de las rutas de la API de Usuarios
const express = require('express');                                 // Importación del módulo de express
const router = express.Router();                                    // Crear una instancia de express.Router para definir las rutas de la API
// Importación de los controladores de usuarios, contienen la lógica para manejar las solicitudes HTTP relacionadas con los usuarios
const { misDatos, login, registrar } = require('../controllers/usersControllers');   // Importación de los controladores de usuarios
// Importación del módulo de autenticación, que se utiliza para proteger las rutas y asegurarse de que solo los usuarios autenticados puedan acceder a ellas
const protect = require('../middleware/authMiddleware');            // Importación del middleware de autenticación (descomentarlo si se necesita protección de rutas)

// Definición de las rutas para los usuarios, estas se encargan de manejar las solicitudes HTTP para los usuarios
router.get('/datos', protect, misDatos);                            // Ruteador para obtener los datos del usuario autenticado por el método GET
router.post('/login', login);                                       // Ruteador para iniciar sesión por el método POST
router.post('/', registrar);                                        // Ruteador para registrar un nuevo usuario por el método POST


// Exportar el ruteador para que pueda ser utilizado en otros archivos
module.exports = router;                                            // Esto permite que las rutas definidas aquí sean accesibles desde
