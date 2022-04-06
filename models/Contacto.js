const mongoose = require('mongoose');
const { type } = require('os');

const Contacto = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    }

},
    {
        timestamps: true,
    }

);

mongoose.model('contacto', Contacto)