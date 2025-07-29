// ==================== Módulo de Protección de todos los Endpoints  ==============================

// Importación de los módulos necesarios para la definción de la Protección de los Endpoints
const jwt = require('jsonwebtoken');                                                    // Importa la librería jsonwebtoken para generar tokens JWT
const asyncHandler = require('express-async-handler');                                  // Importa el middleware para manejar errores de forma asíncrona
const User = require('../models/usersModels');                                          // Importa el modelo de usuario para interactuar con la base de datos

// Middleware para proteger las rutas que requieren autenticación, verifica si el usuario está autenticado mediante un token JWT, este se pasa en los encabezados de la página web
const protect = asyncHandler(async (req, res, next) => {
    let token;                                                                          // Inicializa la variable token
    // Verifica si el token está presente en los encabezados de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {  // Si existe el encabezado de autorización  y comienza con 'Bearer'
        try {
            token = req.headers.authorization.split(' ')[1];                            // ....Extrae el token del encabezado de autorización
            // Verificamos que el token sea válido (firma, caducidad, etc.)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);                  // ....Verifica el token usando la clave secreta definida en las variables de entorno
            // Obtener los datos del usuario del token a través del id_usuario que está en el payload del token para que cualquier endpoint que use protección tenga acceso a esos datos
            req.user = await User.findById(decoded.id_usuario).select('-password');             // ... Busca el usuario en la base de datos por su ID y excluye el campo de contraseña del resultado
            // conitnuamos con un next para salir de aquí y evitar quedarnos para siempre en este middleware
            next();                                                                     // ... Llama al siguiente middleware o ruta si el token es válido y el usuario está autenticado
        } catch (error) {                                                               // Si ocurre un error al verificar el token...
            console.log(error);                                                         // ...Imprime el error en la consola si ocurre un problema al verificar el token
            res.status(401);                                                            // ...Devuelve un error 401 (No autorizado)
            throw new Error('Acceso no autorizado');                                    // ... Lanza un error indicando que el token no es válido
        }
    }
    if (!token) {                                                                       // Si no hay token...
        res.status(401);                                                                // ...Devuelve un error 401 (No autorizado)
        throw new Error('Acceso no autorizado, no se proporcionó el token');            // ... Lanza un error indicando que no hay token y el acceso está denegado
    }
});

// Exporta el middleware de protección para que pueda ser utilizado en las rutas
module.exports = protect;                                                               // Exporta el middleware protect para su uso en otras partes de la aplicación
