const Projeto = require('../models/Projeto');
const { validationResult } = require('express-validator');

exports.criarProjeto = async (req, res) => {

  
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        // Cria novo projeto
        const projeto = new Projeto(req.body);

        // Guardar  o criador via JWT
        projeto.criadoPor = req.usuario.id;

        // guardamos o projeto
        projeto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Há um erro');
    }
}

// Obter os projetos do usuário 
exports.obterProjetos = async (req, res) => {
    try {
        const projetos = await Projeto.find({ criadoPor: req.usuario.id }).sort({ creado: -1 });
        res.json({ projetos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Há um erro');
    }
}

// Atualizar
exports.atualizarProjeto = async (req, res) => {


    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    const { name } = req.body;
    const novoProjeto = {};
    
    if(name) {
        nuevoProjeto.name = name;
    }

    try {

        // revisar o ID 
        let projeto = await Projeto.findById(req.params.id);

        // se o projeto não existe
        if(!projeto) {
            return res.status(404).json({msg: 'Projeto não existe'})
        }

        // Verificar o criador ro projeto
        if(projeto.criadoPor.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Não autorizado'});
        }

        // atualizar
        projeto = await Projeto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto}, { new: true });

        res.json({projeto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Erro de servidor');
    }
}

// Excluir
exports.excluirProjeto = async (req, res ) => {
    try {
        // revisar oID 
        let projeto = await Projeto.findById(req.params.id);

        // se o projeto não exixte
        if(!projeto) {
            return res.status(404).json({msg: 'Projeto não encontrado'})
        }

        // verificar o criador do projeto
        if(projeto.criadoPor.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Não Autorizado'});
        }

        // Eliminar o Projeto
        await Projeto.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Projeto excluído '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Erro de servidor')
    }
}
