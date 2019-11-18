const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;