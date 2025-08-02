// ==================== Definición de los Controladores de Usuarios ==============================

// Importación de los módulos necesarios para la definción de los Controladores de los Usuarios
const asyncHandler = require('express-async-handler');                  // Importación del manejador de errores asíncronos de Express, nos permite manejar errores en las funciones asíncronas de manera más sencilla
const User = require('../models/usersModels');                          // Importación del modelo de Usuarios, que define su estructura en la base de datos
const jwt = require('jsonwebtoken');                                    // Importa el módulo jsonwebtoken (JWT) para manejar la autenticación basada en tokens
const bcrypt = require('bcrypt');                                       // Importa el módulo bcrypt para manejar el hash de contraseñas

// Controlador para registrar un nuevo usuario
const registrar = asyncHandler(async (req, res) => {
    // Desestructurar el cuerpo de la solicitud para obtener los datos del usuario
    // req.body contiene los datos enviados en la solicitud, como nombre, email y password
    const { nombre, email, password } = req.body;               // Extrae el nombre, email y contraseña del cuerpo de la solicitud

    // Verificar si todos los campos requeridos están presentes
    if (!nombre || !email || !password) {
        res.status(400);                                        // Si falta algún campo, devuelve un error 400 (Solicitud incorrecta)
        throw new Error('Faltan datos');                        // Lanza un error indicando que faltan campos
    }

    // Calcular el Hash de la contraseña antes de almacenarla en la base de datos
    const salt = await bcrypt.genSalt(10);                      // Genera un salt para el hash de la contraseña, el número de rondas de salting, que determina la complejidad del hash, Un número mayor de rondas hace que el hash sea más seguro, pero también más lento de calcular
    const hashedPassword = await bcrypt.hash(password, salt);   // Crea un hash de la contraseña utilizando el salt generado

    // Verifica si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ email });           // Busca un usuario con el email proporcionado
    if (userExists) {                                           // Si el usuario ya existe...
        res.status(400);                                        // ... devuelve un error 400 (Solicitud incorrecta)
        throw new Error('El usuario ya existe');                // ... Lanza un error indicando que el usuario ya existe
    }

    // Crea un nuevo usuario con los datos proporcionados
    const user = await User.create({                            // Crea un nuevo usuario en la base de datos, esta es una función de Mongoose que crea un nuevo documento en la colección de usuarios
        nombre,                                                 // Asigna el nombre del usuario, no es necesario usar nombre: nombre ya que son iguales
        email,                                                  // Asigna el email del usuario, no es necesario usar email: email ya que son iguales
        password: hashedPassword                                // Usar la contraseña hasheada en lugar de la contraseña en texto plano
    });

    // Si se pudo crear el usuario, devuelve los datos del usuario y un token JWT, que se utiliza para autenticar al usuario en futuras solicitudes
    if (user) {                                                     // Si el usuario se creó correctamente...
        res.status(201).json({                                      // ... Devuelve el nuevo usuario creado y un token JWT, estatuas 201 indica que la solicitud ha tenido éxito
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user.id)                          // Genera un token JWT para el nuevo usuario
        });
    } else {                                                        // Si no se pudo crear el usuario...
        res.status(400);                                            // ... devuelve un error 400 (Solicitud incorrecta)
        throw new Error('Error al crear el usuario');               // ... Lanza un error indicando que hubo un problema al crear el usuario
    }
});

// ------------- Controlador para iniciar sesión (Login) de un usuario ------------------------
const login = asyncHandler(async (req, res) => {
    // Desestructurar el cuerpo de la solicitud para obtener las credenciales del usuario
    // req.body contiene los datos enviados en la solicitud, como email y password
    const { email, password } = req.body;                           // Extrae el email y la contraseña del cuerpo de la solicitud

    // Verifica si el usuario existe en la base de datos
    const user = await User.findOne({ email });                     // Busca un usuario con el email proporcionado
    if (user && (await bcrypt.compare(password, user.password))) {  // Si el usuario existe y la contraseña proporcionada es igual a la almacenada en la base de datos...
        res.json({                                                  // ... Devuelve en la respuesta (res) los datos del usuario y un token JWT
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user.id)                          // Genera un token JWT para el usuario autenticado
        });
    } else {                                                        // Si el usuario no existe o la contraseña es incorrecta... 
        res.status(401);                                            // ... Devuelve un error 401 (No autorizado)
        throw new Error('Credenciales inválidas');                  // ... Lanza un error indicando que las credenciales son inválidas
    }
});

// Controlador para obtener los datos del usuario autenticado
const misDatos = asyncHandler(async (req, res) => {
    // Obtiene el usuario autenticado de la solicitud
    res.status(200).json(req.user);                                 // Devuelve los datos del usuario en formato JSON y un estado 200 (OK)
});

// ------------- Función para generar un token JWT
const generateToken = (id_usuario) => {
    return jwt.sign({ id_usuario },                                 // Genera un token JWT utilizando el ID del usuario
        process.env.JWT_SECRET,                                     // La clave secreta para firmar el token (Ver las variables de entorno)
        {                               
        expiresIn: '30d'                                            // El token expirará en 30 días
    });
}

// Exporta los controladores para que puedan ser utilizados en las rutas, estos contienen la lógica para manejar las solicitudes HTTP relacionadas con los usuarios
module.exports = {
    registrar,
    login,
    misDatos
};
