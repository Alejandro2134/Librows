const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

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
    const query2 = await pool.query('SELECT * FROM comentario WHERE idLibroFK = ?', [id]);

    Promise.all([
        query[0],
        query2
    ])
    .then(([book, comments]) => {
        res.render('catalogo/libro', {
            book,
            comments
        });
    });
});

router.get('/:id/agregarResena', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const book = await pool.query('SELECT * FROM libro WHERE idLibro = ?', [id]);
    res.render('catalogo/agregarReseña', { book: book[0] });
})

router.post('/:id/agregarResena', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    const { descripcion } = req.body;
   
    const newComment = {
        idLibroFK: id,
        idUsuarioFK: req.user.idUsuario,
        descripcion,
    };

    await pool.query('INSERT INTO comentario set ?', [newComment]);
    res.redirect('/catalogo/' + id);
})

module.exports = router;