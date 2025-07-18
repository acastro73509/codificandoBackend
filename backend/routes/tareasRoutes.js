const express = require('express');     // Importación del módulo de express
const router = express.Router();        // Crear una instancia de express.Router para definir las rutas de la API

// Importación de los controladores de tareas
// Estos controladores contienen la lógica para manejar las solicitudes HTTP relacionadas con las tareas
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareasControllers');    // Importación del Módulo Controlador de Tareas (Controllers)

// Definición de las rutas para las tareas
// Estas rutas se encargan de manejar las solicitudes HTTP para las tareas
router.get('/', getTareas);             // Ruteador para obtener todas las tareas por el método GET
router.post('/', createTareas);         // Ruteador para crear una nueva tarea por el método POST
router.put('/:id', updateTareas);       // Ruteador para actualizar una tarea por ID con el método PUT
router.delete('/:id', deleteTareas);    // Ruteador para eliminar una tarea por ID con el método DELETE

// Exportar el ruteador para que pueda ser utilizado en otros archivos
module.exports = router;                // Esto permite que las rutas definidas aquí sean accesibles desde el archivo principal del servidor
                                        
