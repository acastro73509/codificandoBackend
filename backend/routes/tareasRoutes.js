const express = require('express');                                 // Importación del módulo de express
const router = express.Router();                                    // Crear una instancia de express.Router para definir las rutas de la API
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareasControllers');    // Importación del Módulo Controlador de Tareas (Controllers)
const protect = require('../middleware/authMiddleware');            // Importación del middleware de autenticación (descomentarlo si se necesita protección de rutas)

// Definición de las rutas para las tareas, estas se encargan de manejar las solicitudes HTTP para las tareas
router.get('/', protect, getTareas);                                // Ruteador para obtener todas las tareas por el método GET
router.post('/', protect, createTareas);                            // Ruteador para crear una nueva tarea por el método POST
router.put('/:id', protect, updateTareas);                          // Ruteador para actualizar una tarea por ID con el método PUT
router.delete('/:id', protect, deleteTareas);                       // Ruteador para eliminar una tarea por ID con el método DELETE

// Exportar el ruteador para que pueda ser utilizado en otros archivos
module.exports = router;                                        // Esto permite que las rutas definidas aquí sean accesibles desde el archivo principal del servidor
                                        
