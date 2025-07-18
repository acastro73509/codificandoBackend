const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; // Si no hay código de estado, usar 500
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack // Ocultar el stack trace en producción
    });
}

module.exports = errorHandler; // Exportar el middleware de manejo de errores para que pueda ser utilizado en otros archivos
