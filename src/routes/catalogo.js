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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await pool.query('SELECT * FROM libro WHERE idLibro = ?', [id]);
    const query2 = await pool.query('SELECT descripcion FROM comentario WHERE idLibroFK = ?', [id]);

    Promise.all([
        query[0],
        query2[0]
    ])
    .then(([book, comments]) => {
        res.render('libro', {
            book,
            comments
        });
    })
});

module.exports = router;