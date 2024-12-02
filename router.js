// Importa el módulo express y crea un enrutador para manejar las rutas.
const express = require('express');
const router = express.Router();

// Importa el archivo de configuración de la base de datos.
const conexion = require('./database/db');

// Ruta principal para obtener todos los usuarios.
router.get('/', (req, res) => {
    // Realiza una consulta SQL para seleccionar todos los usuarios de la base de datos.
    conexion.query('SELECT * FROM users', (error, results) => {
        if (error) {
            // Si ocurre un error en la consulta, lo lanza.
            throw error;
        } else {
            // Si la consulta es exitosa, renderiza la vista 'index.ejs' pasando los resultados de la consulta como un objeto.
            res.render('index.ejs', { results: results });
        }
    });
});

// Ruta para mostrar el formulario de creación de un nuevo usuario.
router.get('/create', (req, res) => {
    // Renderiza la vista 'create.ejs', donde el usuario podrá ingresar los datos para crear un nuevo registro.
    res.render('create');
});

// Ruta para mostrar el formulario de edición de un usuario específico basado en su ID.
router.get('/edit/:id', (req, res) => {
    // Obtiene el ID del usuario desde los parámetros de la URL.
    const id = req.params.id;
    
    // Realiza una consulta SQL para obtener los datos del usuario con el ID especificado.
    conexion.query('SELECT * FROM users WHERE id=?', [id], (error, results) => {
        if (error) {
            // Si ocurre un error, lo lanza.
            throw error;
        } else {
            // Si la consulta es exitosa, renderiza la vista 'edit.ejs' pasando los datos del usuario.
            res.render('edit.ejs', { user: results[0] });
        }
    });
});

// Ruta para eliminar un usuario basado en su ID.
router.get('/delete/:id', (req, res) => {
    // Obtiene el ID del usuario desde los parámetros de la URL.
    const id = req.params.id;
    
    // Realiza una consulta SQL para eliminar al usuario con el ID especificado.
    conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            // Si ocurre un error, muestra el error en la consola.
            console.log(error);
        } else {
            // Si la eliminación es exitosa, redirige al usuario a la página principal.
            res.redirect('/');
        }
    });
});

// Importa los controladores para manejar las operaciones CRUD (guardar y actualizar).
const crud = require('./controller/crud');

// Ruta para guardar un nuevo usuario (usando el método 'save' del controlador 'crud').
router.post('/save', crud.save);

// Ruta para actualizar un usuario (usando el método 'update' del controlador 'crud').
router.post('/update', crud.update);

// Exporta el enrutador para que pueda ser utilizado en otros archivos (como 'app.js').
module.exports = router;
