const express = require('express');
const router = express.Router();

const passport = require('passport');

const pool = require('../database');

router.get('/', (req, res) => {
    res.render('home');
})

router.post('/', passport.authenticate('local.auth', {
    successRedirect: '/perfil',
    failureRedirect: '/',
    failureFlash: true
}))

router.get('/perfil', (req, res) => {
    res.send('HOLA :D');
})

router.get('/catalogo', (req, res) => {
    res.render('catalogo');
})

module.exports = router;