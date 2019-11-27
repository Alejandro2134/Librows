const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.auth', new LocalStrategy({

    usernameField: 'textNombreUsuario',
    passwordField: 'textContraseña',
    passReqToCallback: true

}, async (req, textNombreUsuario, textContraseña, done) => {

    var num = 0;
    
    const h = JSON.parse(JSON.stringify(req.body));
    
    for(var key in req.body){
        if(h.hasOwnProperty(key)){
            num +=1
        }
    }

    console.log(num);

    if(num == 2){
        
        const rows = await pool.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [textNombreUsuario]);

        if(rows.length > 0){
            const user = rows[0];
            const validPassword = await helpers.matchPassword(textContraseña, user.contraseña);
            if(validPassword){
                done(null, user, req.flash('success', 'Bienvenido ' + user.nombreUsuario));
            } else {
                done(null, false, req.flash('message', 'Contraseña incorrecta'));
            }
        } else {
            return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
        }

    } else {

        const { textNombres, textApellidos, textCorreo } = req.body;

        const newUser = {
            nombreUsuario: textNombreUsuario,
            contraseña: textContraseña,
            nombre: textNombres,
            apellido: textApellidos,
            correo: textCorreo
        };

        newUser.contraseña = await helpers.encryptPassword(textContraseña);
        const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
        newUser.id = result.insertId;
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.idUsuario);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
    done(null, rows[0]);
});
