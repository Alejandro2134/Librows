const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');

const { database } = require('./keys');

//Inicialización de modulos
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'hellen',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next ) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});

//Routes
app.use(require('./routes'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});