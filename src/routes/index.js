const express = require('express');
const router = express.Router();

const passport = require('passport');

const pool = require('../database');

const { isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn, (req, res) => {
    res.render('home');
})

router.post('/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.auth', {
        successRedirect: '/perfil',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
})

module.exports = router;