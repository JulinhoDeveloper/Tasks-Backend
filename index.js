const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// criar o servidor
const app = express();

// Conectar ao banco de dados
dbConnection();

//  cors
app.use(cors());

// Habilitar express.json
app.use( express.json({ extended: true }));

// Importar rotas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projetos', require('./routes/projetos'));

// porta 
const port = process.env.PORT || 4000;



// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor na porta ${port}`);
});