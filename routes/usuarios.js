// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombre', 'O nome é obrogatório').not().isEmpty(),
        check('email', 'Digite um email vãlido').isEmail(),
        check('password', 'A senha deve ser de no mínimo 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.crearUsuario
);


module.exports = router;