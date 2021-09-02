// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');


// Iniciar sesssão
// api/auth
router.post('/', 
    authController.autenticarUsuario
);

// Obter o usuário autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;