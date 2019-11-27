const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/perfil', (req, res) => {
    res.render('perfil');
});

router.get('/cerrarSesion', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;