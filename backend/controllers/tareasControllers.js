// Importación del manejador de errores asíncronos de Express, nos permite manejar errores en las funciones asíncronas de manera más sencilla
const asyncHandler = require('express-async-handler');

// Inicia la definición de la funcionalidad de los controladores de tareas
const getTareas = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Tareas' });
})

const createTareas = asyncHandler( async (req, res) => {
    // Para parámetros en el cuerpo de la petición, 
    if (!req.body.descripcion) {
        res.status(400);                                                        // Si no hay descripción, se devuelve un error 400, el error 400 indica que la solicitud no se pudo completar debido a un error del cliente
        throw new Error('Por favor teclea una descripción');
    }
    res.status(201).json({ message: `${req.body.descripcion} Creada` });
})

const updateTareas = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Tarea ${req.params.id} modificada` });
})

const deleteTareas = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Tarea ${req.params.id} eliminada` });
})

// Exportar los controladores de tareas para que puedan ser utilizados en las rutas
module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
};

