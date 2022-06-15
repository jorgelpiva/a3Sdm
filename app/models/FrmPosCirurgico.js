const mongoose = require('../../src/database');

const frmPosCirurgicoSchema = new mongoose.Schema({
    
    acompPos: {
        type: Boolean,
        require: true
    },
    
    examPos: {
        type: Boolean,
        require: true
    },

    sangue: {
        type: Boolean,
        require: true
    },
    image: {
        type: Boolean,
        require: true
    },
    outros:{
        type: Boolean,
        requiere: true
    },

    observ: {
        type: String
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});


const FrmPosCirurgico = mongoose.model('frmPosCirurgico', frmPosCirurgicoSchema);

module.exports = FrmPosCirurgico;