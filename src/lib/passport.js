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

    if(num == 2){
        console.log(req.body);
    } else {

        console.log(req.body);
        const { textNombres, textApellidos, textCorreo } = req.body;

        const newUser = {
            textNombreUsuario,
            textContraseña,
            textNombres,
            textApellidos,
            textCorreo
        };

        newUser.textContraseña = await helpers.encryptPassword(textContraseña);
        const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
        newUser.id = result.insertId;
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
    done(null, rows[0]);
})
