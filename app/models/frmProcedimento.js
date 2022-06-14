const mongoose = require('../../src/database');

const frmProcedimentoSchema = new mongoose.Schema({
    nomeHospital: {
        type: String,
    },
    nomeMedico: {
        type: String,
    },
    crmMedico: {
        type: String,
    },
    dtRealizacao: {
        type: Date,
    },
    modoRealizado: {
        type: String,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const frmProcedimento = mongoose.model('frmProcedimento', frmProcedimentoSchema);

module.exports = frmProcedimento;