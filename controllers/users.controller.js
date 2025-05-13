const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/users.json');

// lee usuarios desde el archivo JSON
const leerUsuarios = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

let usuarios = leerUsuarios();

// Escribir usuarios al archivo db
const escribirUsuarios = (usuarios) => {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
};

// GET tenemos todos los usuarios
const getUsers = (req, res) => {
    res.json({ data: usuarios, status: 200, message: 'Usuarios obtenidos correctamente' });
};

// GET usuario por ID
const getUsersById = (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' });
    res.json({ data: usuario, status: 200, message: 'Usuario encontrado' });
};

// POST creaamos usuario
const createUsers = (req, res) => {
    const { nombre, email, edad } = req.body;

    if (!nombre || !email || !edad) {   //extras
        return res.json({ status: 400, message: 'Faltan datos obligatorios: nombre, email o edad' });  
    }

    const emailRepetido = usuarios.find(u => u.email === email);   //extras
    if (emailRepetido) {
        return res.json({ status: 400, message: 'El email ya esta en uso' });
    }

    const nuevoUsuario = {
        id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nombre,
        email,
        edad
    };

    usuarios.push(nuevoUsuario);
    escribirUsuarios(usuarios);

    res.json({ status: 201, data: nuevoUsuario, message: 'Usuario creado exitosamente' });
};

// PUT editamos usuario
const updateUsers = (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' });

    const { nombre, email, edad } = req.body;

    const emailRepetido = usuarios.find(u => u.email === email && u.id !== usuario.id);
    if (email && emailRepetido) {
        return res.json({ status: 400, message: 'El email ya esta en uso por otro usuario' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.edad = edad || usuario.edad;

    escribirUsuarios(usuarios);
    res.json({ status: 200, data: usuario, message: 'Usuario actualizado exitosamente' });
};

// DELETE borramos usuarios
const deleteUsers = (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.json({ status: 404, message: 'Usuario no encontrado' });

    usuarios = usuarios.filter(u => u.id !== usuario.id);
    escribirUsuarios(usuarios);  //deberia guardarlo en la base de datos

    res.json({ status: 200, message: 'Usuario eliminado exitosamente' });
};

module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
};
