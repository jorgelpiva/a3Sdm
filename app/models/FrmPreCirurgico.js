const mongoose = require('../../src/database');

const frmPreCirurgicoSchema = new mongoose.Schema({
    
    acompPre: {
        type: Boolean,
        require: true
    },
    
    examPre: {
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

    resultAnt:{
        type: Object,
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

const FrmPreCirurgico = mongoose.model('frmPreCirurgico', frmPreCirurgicoSchema);

module.exports = FrmPreCirurgico;