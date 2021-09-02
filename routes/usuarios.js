// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Criar  usuario
// api/usuarios
router.post('/', 
    [
        check('name', 'O nome é obrogatório').not().isEmpty(),
        check('email', 'Digite um email vãlido').isEmail(),
        check('password', 'A senha deve ser de no mínimo 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.criarUsuario
);


module.exports = router;