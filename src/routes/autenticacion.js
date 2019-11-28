const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

router.get('/perfil', isLoggedIn , (req, res) => {
    res.render('perfil');
});

router.get('/cerrarSesion', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;