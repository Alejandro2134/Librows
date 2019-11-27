const express = require('express');
const router = express.Router();

const passport = require('passport');
const pool = require('../database');

router.get('/ultimosLibros', async (req, res) => {
    const newBooks = await pool.query('SELECT * FROM libro ORDER BY idLibro DESC');
    res.render('catalogo/ultimosLibros', { newBooks })
});

router.get('/libroCalificacion', async (req, res) => {
    const bestBooks = await pool.query('SELECT * FROM libro ORDER BY idLibro ASC');
    res.render('catalogo/libroCalificacion', { bestBooks })
});

module.exports = router;