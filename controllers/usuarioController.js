

const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // erros
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    
    const { email, password } = req.body;


    try {
        // Verificar se o usuário é único
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        // Criar novo usuario
        usuario = new Usuario(req.body);

        // Criptografar a senha
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );

        // guardar usuario
        await usuario.save();

        // Criar JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //  JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            
            res.json({ token  });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Erro');
    }
}