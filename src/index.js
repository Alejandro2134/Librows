const express = require('express');
const morgan = require('morgan');

//Inicialización de modulos
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));

//Variables globales

//Routes

//Public

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});