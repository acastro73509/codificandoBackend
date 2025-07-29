// ==================== Definición de los Controladores de Tareas ==============================

// Importación de los módulos necesarios para la definción de los Controladores de los Tareas
const asyncHandler = require('express-async-handler');                  // Importación del manejador de errores asíncronos de Express, nos permite manejar errores en las funciones asíncronas de manera más sencilla
const Tarea = require('../models/tareasModels');                        // Importación del modelo de Tareas, que define su estructura en la base de datos

// Controlador para obtener todas las tareas del usuario autenticado
const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({ user: req.user.id});              // El método find() busca todas las tareas en la base de datos, filtrando por el ID del usuario autenticado
    res.status(200).json(tareas);                                       // Devuelve las tareas encontradas con un estado 200 (OK)
})

// Controlador para crear una nueva tarea
const createTareas = asyncHandler( async (req, res) => {
    // Los parámetros vienen en el cuerpo de la petición en req.body
    if (!req.body.descripcion) {                                        // Si no hay descripción de la tarea en el cuerpo de la solicitud...
        res.status(400);                                                // ... Devuelve un error 400, que indica que la solicitud no se pudo completar debido a un error del cliente
        throw new Error('Por favor teclea una descripción');            // ... Lanza un error con un mensaje específico si la descripción no está presente
    }

    // Crea una nueva tarea, con el método create(), con la descripción proporcionada en el cuerpo de la solicitud
    const tarea = await Tarea.create({                                  // La descripción de la tarea se obtiene del cuerpo de la solicitud (req.body)
        descripcion: req.body.descripcion,                              // Asigna la descripción de la tarea desde el cuerpo de la solicitud
        user: req.user.id                                               // Asigna el ID del usuario autenticado a la tarea, esto asegura que la tarea esté asociada al usuario que la creó
    });
    res.status(201).json(tarea);                                        // Devuelve la tarea creada con un estado 201 (Creado), que indica que la solicitud se ha completado y se ha creado un nuevo recurso
})

// Controlador para actualizar una tarea por su ID
const updateTareas = asyncHandler( async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);                  // Busca la tarea por su ID en la base de datos para verificar si existe
    if (!tarea) {                                                       // Si la tarea no se encuentra...
        res.status(404);                                                // ... Devuelve un error 404 (No encontrado)
        throw new Error('Tarea no encontrada');                         // ... Lanza un error si la tarea no se encuentra
    }

    if (tarea.user.toString() !== req.user.id) {                        // Si el usuario de la tarea es distinta del ID del usuario autenticado (No es propietario de la tarea)...
        res.status(401);                                                // ... Devuelve un error 401 (No autorizado)
        throw new Error('Usuario no autorizado');                       // ... Lanza un error indicando que el usuario no está autorizado para actualizar esta tarea
    } else {                                                            // Si el usuario es el propietario de la tarea...
        const tareaUpdated = await Tarea.findByIdAndUpdate(             // ... Actualiza la tarea usando el método findByIdAndUpdate() con el id pasado en parámetros y los nuevos datos proporcionados en el cuerpo de la solicitud
            req.params.id,                                              // ... ID de la tarea a actualizar
            req.body,                                                   // ... Nuevos datos de la tarea desde el cuerpo de la solicitud
            {
                new: true,                                              // ... Devuelve el documento actualizado
                runValidators: true                                     // ... Ejecuta los validadores del esquema antes de actualizar
            }
        );
        res.status(200).json(tareaUpdated);                             // ... Devuelve la tarea actualizada como respuesta
    }
})

// Controlador para eliminar una tarea por su ID
const deleteTareas = asyncHandler (async (req, res) => {
    const tarea = await Tarea.findById(req.params.id);                  // Busca la tarea por su ID en la base de datos para verificar si existe
    if (!tarea) {                                                       // Si la tarea no se encuentra...
        res.status(404);                                                // Si no se encuentra devuelve un error 404 (No encontrado)
        throw new Error('Tarea no encontrada');                         // Lanza un error si la tarea no se encuentra
    }

    if (tarea.user.toString() !== req.user.id) {                        // Si el usuario de la tarea es distinta del ID del usuario autenticado (No es propietario de la tarea)...
        res.status(401);                                                // ... Devuelve un error 401 (No autorizado)
        throw new Error('Usuario no autorizado');                       // ... Lanza un error indicando que el usuario no está autorizado para eliminar esta tarea
    } else {                                                            // Si el usuario es el propietario de la tarea...
        await Tarea.deleteOne(tarea);                                   // Elimina la tarea de la colección de tareas usando el método deleteOne(), se utiliza el objeto tarea encontrado para eliminarlo
        res.status(200).json({ message: `Tarea ${req.params.id} eliminada` }); // Devuelve un mensaje de éxito indicando que la tarea ha sido eliminada
    }
})

// Exportar los controladores de tareas para que puedan ser utilizados en las rutas
module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
};

