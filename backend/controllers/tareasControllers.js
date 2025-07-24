// Importación del manejador de errores asíncronos de Express, nos permite manejar errores en las funciones asíncronas de manera más sencilla
const asyncHandler = require('express-async-handler');
// Importación del modelo de Tarea, que define la estructura de los datos de las tareas en la base de datos
// Este archivo contiene los controladores para manejar las operaciones CRUD de las tareas
// Los controladores son funciones que se encargan de procesar las solicitudes y respuestas del servidor
const Tarea = require('../models/tareasModels');                        // Importación del modelo de Tarea, que define la estructura de los datos de las tareas en la base de datos

// Inicia la definición de la funcionalidad de los controladores de tareas

const getTareas = asyncHandler(async (req, res) => {
   
    const tareas = await Tarea.find({});                                // El método find() busca todas las tareas en la base de datos
    res.status(200).json(tareas);                                       // Devuelve las tareas encontradas con un estado 200 (OK)
})

const createTareas = asyncHandler( async (req, res) => {
    // Para parámetros en el cuerpo de la petición, se utiliza req.body
    // Verifica si la descripción de la tarea está presente en el cuerpo de la solicitud
    if (!req.body.descripcion) {
        res.status(400);                                                // Si no hay descripción, se devuelve un error 400, el error 400 indica que la solicitud no se pudo completar debido a un error del cliente
        throw new Error('Por favor teclea una descripción');            // Lanza un error con un mensaje específico si la descripción no está presente
    }

    // Crea una nueva tarea con la descripción proporcionada en el cuerpo de la solicitud
    // El método create() crea un nuevo documento en la colección de tareas
    const tarea = await Tarea.create({
        // La descripción de la tarea se obtiene del cuerpo de la solicitud (req.body)
        descripcion: req.body.descripcion                               // Asigna la descripción de la tarea desde el cuerpo de la solicitud
    });
    // Devuelve la tarea creada con un estado 201 (Creada), 201 indica que la solicitud ha tenido éxito y se ha creado un nuevo recurso, en este caso, se ha creado una nueva tarea en la base de datos
    res.status(201).json(tarea);
})

const updateTareas = asyncHandler( async (req, res) => {
    // Verifica si la tarea existe en la base de datos
    const tarea = await Tarea.findById(req.params.id);                 // Busca la tarea por su ID en la base de datos
    if (!tarea) {                                                      // Si la tarea no se encuentra...
        res.status(404);                                               // Si no se encuentra devuelve un error 404 (No encontrado)
        throw new Error('Tarea no encontrada');                        // Lanza un error si la tarea no se encuentra
    }
    // Actualiza la tarea con la nueva descripción proporcionada en el cuerpo de la solicitud
    // El método findByIdAndUpdate() busca la tarea por su ID y la actualiza con los nuevos datos
    const tareaUpdated = await Tarea.findByIdAndUpdate(
        req.params.id,                                                 // ID de la tarea a actualizar
        req.body,                                                      // Nuevos datos de la tarea desde el cuerpo de la solicitud
        {
            new: true,                                                 // Devuelve el documento actualizado
            runValidators: true                                        // Ejecuta los validadores del esquema antes de actualizar
        }
    );
    // Devuelve la tarea actualizada con un estado 200 (OK)
    // El estado 200 indica que la solicitud ha tenido éxito y se ha actualizado el recurso
    res.status(200).json(tareaUpdated);                                 // Devuelve la tarea actualizada como respuesta

})

// Elimina una tarea por su ID
// El método deleteTareas se encarga de eliminar una tarea específica de la base de datos
const deleteTareas = asyncHandler (async (req, res) => {
    // Verifica si la tarea existe en la base de datos
    const tarea = await Tarea.findById(req.params.id);                 // Busca la tarea por su ID en la base de datos
    if (!tarea) {                                                      // Si la tarea no se encuentra...
        res.status(404);                                               // Si no se encuentra devuelve un error 404 (No encontrado)
        throw new Error('Tarea no encontrada');                        // Lanza un error si la tarea no se encuentra
    }

    // Elimina la tarea de la base de datos
    // El método deleteOne() elimina un documento específico de la colección de tareas
    // Se utiliza el objeto tarea encontrado para eliminarlo
    await Tarea.deleteOne(tarea);                                       // Elimina la tarea encontrada
    // Devuelve un mensaje de éxito con un estado 200 (OK), que indica que la solicitud ha tenido éxito y se ha eliminado el recurso correctamente
    res.status(200).json({ message: `Tarea ${req.params.id} eliminada` }); // Devuelve un mensaje de éxito indicando que la tarea ha sido eliminada
})

// Exportar los controladores de tareas para que puedan ser utilizados en las rutas
module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
};

