const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Ler o token do header
    const token = req.header('x-auth-token');

    // Revisar se há token
    if(!token) {
        return res.status(401).json({msg: 'sem token, sem permissão'})
    }

    // validar o token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token não válido'});
    }
}