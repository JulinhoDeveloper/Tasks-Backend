const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetosController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Criar projetos
// api/projetos
router.post('/', 
    auth,
    [
        check('name', 'O nome é obrigatório').not().isEmpty()
    ],
    projetoController.criarProjeto
);

// Obter todos os projetos
router.get('/', 
    auth,
    projetoController.obterProjetos
)

// Atualizar projeto via ID
router.put('/:id', 
    auth,
    [
        check('name', 'O nome do projeto é obrigatório').not().isEmpty()
    ],
    projetoController.atualizarProjeto
);

// Excluir projeto
router.delete('/:id', 
    auth,
    projetoController.excluirProjeto
);

module.exports = router;