const errorHandler = (err, req, res, next) => {                         // Se define un Middleware para manejar errores
    const statusCode = res.statusCode ? res.statusCode : 500;           // Si no hay código de estado, usar 500
    res.status(statusCode);                                             // Establecer el código de estado de la respuesta
    res.json({                                                          // Enviar una respuesta JSON con el error
        message: err.message,                                           // Mensaje del error, es el mensaje que se envía al cliente
        stack: process.env.NODE_ENV == 'production' ? null : err.stack  // Ocultar el stack trace si la variable de entorno MODE_ENV es en producción
    });
}

module.exports = errorHandler;              // Exportar el middleware de manejo de errores para que pueda ser utilizado en otros archivos
