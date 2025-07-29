// ==================== Definición de las rutas relacionadas con las tareas ==============================

// Importación de los módulos necesarios para la creación de las rutas de la API de Tareas
const express = require('express');                                 // Importación del módulo de express
const router = express.Router();                                    // Crear una instancia de express.Router para definir las rutas de la API
// Importación de los controladores de usuarios, contienen la lógica para manejar las solicitudes HTTP relacionadas con los usuarios
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareasControllers');    // Importación del Módulo Controlador de Tareas (Controllers)
// Importación del módulo de autenticación, que se utiliza para proteger las rutas y asegurarse de que solo los usuarios autenticados puedan acceder a ellas
const protect = require('../middleware/authMiddleware');            // Importación del middleware de autenticación en las rutas

// Definición de las rutas para las tareas, estas se encargan de manejar las solicitudes HTTP para las tareas
router.get('/', protect, getTareas);                                // Ruteador para obtener todas las tareas por el método GET, protegido por el middleware de autenticación
router.post('/', protect, createTareas);                            // Ruteador para crear una nueva tarea por el método POST, protegido por el middleware de autenticación
router.put('/:id', protect, updateTareas);                          // Ruteador para actualizar una tarea por ID con el método PUT, protegido por el middleware de autenticación
router.delete('/:id', protect, deleteTareas);                       // Ruteador para eliminar una tarea por ID con el método DELETE, protegido por el middleware de autenticación

// Exportar el ruteador para que pueda ser utilizado en otros archivos
module.exports = router;                                            // Esto permite que las rutas definidas aquí sean accesibles desde el archivo principal del servidor                                     
