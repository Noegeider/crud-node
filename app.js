// Importa el módulo express para crear el servidor.
const express = require('express');

// Crea una instancia de una aplicación Express.
const app = express();

// Establece EJS como el motor de plantillas para renderizar las vistas.
app.set('view engine', 'ejs');

// Middleware para analizar los datos del cuerpo de la solicitud (POST) y convertirlos en objetos JavaScript. 
// 'extended: false' significa que solo se pueden procesar datos sencillos (no complejos).
app.use(express.urlencoded({ extended: false }));

// Middleware para analizar el cuerpo de la solicitud en formato JSON y convertirlo en un objeto JavaScript.
app.use(express.json());

// Define que las rutas se gestionarán desde el archivo 'router.js'.
app.use('/', require('./router'));

// Inicia el servidor y hace que escuche en el puerto 3000.
// El callback muestra un mensaje en la consola indicando que el servidor está corriendo.
app.listen(3000, () => {
    console.log('SERVER corriendo en http://localhost:3000');
});
