const jwt = require('jsonwebtoken');                            // Importa el módulo jsonwebtoken para manejar la autenticación basada en tokens
const bcrypt = require('bcrypt');                               // Importa el módulo bcrypt para manejar el hash de contraseñas
const asyncHandler = require('express-async-handler');          // Importa el middleware para manejar errores
const User = require('../models/usersModels');                  // Importa el modelo de usuario para interactuar con la base de datos

// Controlador para obtener los datos del usuario autenticado
const misDatos = asyncHandler(async (req, res) => {
    // Obtiene el usuario autenticado de la solicitud
    const { user } = req;                                       // Extrae el usuario del objeto de solicitud (req)
    res.json(user);                                             // Devuelve los datos del usuario en formato JSON
});

// Controlador para registrar un nuevo usuario
const registrar = asyncHandler(async (req, res) => {
    const { nombre, email, password } = req.body;               // Extrae el nombre, email y contraseña del cuerpo de la solicitud

    // Verificar si todos los campos requeridos están presentes
    if (!nombre || !email || !password) {
        res.status(400);                                        // Si falta algún campo, devuelve un error 400 (Solicitud incorrecta)
        throw new Error('Faltan datos');                        // Lanza un error indicando que faltan campos
    }

    // Calcular el Hash de la contraseña antes de almacenarla en la base de datos
    // El método hash() de bcrypt se utiliza para crear un hash seguro de la contraseña
    // El segundo parámetro es el número de rondas de salting, que determina la complejidad del hash
    // Un número mayor de rondas hace que el hash sea más seguro, pero también más lento de calcular
    // En este caso, se utiliza 10 rondas de salting para crear un hash
    const salt= await bcrypt.genSalt(10);                       // Genera un salt para el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, salt);   // Crea un hash de la contraseña utilizando el salt generado

    // Verifica si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ email });           // Busca un usuario con el email proporcionado
    if (userExists) {
        res.status(400);                                        // Si el usuario ya existe, devuelve un error 400 (Solicitud incorrecta)
        throw new Error('El usuario ya existe');                // Lanza un error indicando que el usuario ya existe
    }

    // Crea un nuevo usuario con los datos proporcionados
    const user = await User.create({
        nombre,                                                 // Asigna el nombre del usuario, no es necesario usar nombre: nombre ya que son iguales
        email,                                                  // Asigna el email del usuario, no es necesario usar email: email ya que son iguales
        password: hashedPassword                                // Usar la contraseña hasheada en lugar de la contraseña en texto plano
    });

    // Si se pudo crear el usuario, devuelve los datos del usuario y un token JWT
    // El token JWT se utiliza para autenticar al usuario en futuras solicitudes
    // El token se genera utilizando el ID del usuario y una clave secreta definida en las variables de entorno
    // El token expirará en 30 días
    if (user) {                                                // Si el usuario se creó correctamente...
        res.status(201).json({                                 // Devuelve el nuevo usuario creado y un token JWT
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id)                     // Genera un token JWT para el nuevo usuario
        });
    } else {
        res.status(400);                                       // Si no se pudo crear el usuario, devuelve un error 400 (Solicitud incorrecta)
        throw new Error('Error al crear el usuario');          // Lanza un error indicando que hubo un problema al crear el usuario
    }
});

// Controlador para iniciar sesión
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;                       // Extrae el email y la contraseña del cuerpo de la solicitud

    // Verifica si el usuario existe en la base de datos
    const user = await User.findOne({ email });             // Busca un usuario con el email proporcionado
    if (user && (await bcrypt.compare(password, user.password))) { // Compara la contraseña proporcionada con la almacenada en la base de datos
        res.json({                                          // Si las credenciales son correctas, devuelve los datos del usuario y un token JWT
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id)                  // Genera un token JWT para el usuario autenticado
        });
    } else {
        res.status(401);                                    // Si las credenciales son incorrectas, devuelve un error 401 (No autorizado)
        throw new Error('Credenciales inválidas');          // Lanza un error indicando que las credenciales son inválidas
    }
});

// Función para generar un token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {         // Crea un token JWT con el ID del usuario y la clave secreta definida en las variables de entorno
        expiresIn: '30d'                                      // El token expirará en 30 días
    });
}

// Exporta los controladores para que puedan ser utilizados en las rutas
module.exports = {
    misDatos,
    login,
    registrar
};
// Exporta los controladores para que puedan ser utilizados en las rutas
// Estos controladores contienen la lógica para manejar las solicitudes HTTP relacionadas con los usuarios
