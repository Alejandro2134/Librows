const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil');
});

router.get('/biblioteca', isLoggedIn, async (req, res) => {
    const biblioteca = await pool.query('SELECT * FROM libro ORDER BY idLibro ASC');
    res.render('biblioteca', { biblioteca });
})

router.get('/cerrarSesion', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;