const express = require('express'); //importamos express
const app = express(); //creamos una instancia de express
const PORT = 3000; //definimos el puerto 3000

const usersRoutes = require('./routes/users.routes');  //importamos las rutas de usuarios

app.use(express.json()); //nos sirve para parsear el cuerpo de las peticiones como JSON

// Rutas
app.use('/usuarios', usersRoutes); //definimos la ruta base para los usuarios

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); //iniciamos el servidor en el puerto 3000 que definimos
});
