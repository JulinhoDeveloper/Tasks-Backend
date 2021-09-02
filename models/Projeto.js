const mongoose = require('mongoose');

const ProjetoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    criadoPor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    criado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Projeto', ProjetoSchema);