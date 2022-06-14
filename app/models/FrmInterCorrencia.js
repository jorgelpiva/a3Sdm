const mongoose = require('../../src/database');

const frmIntercorrenciaSchema = new mongoose.Schema({
    sintCpre: {
        type: Boolean,
        require: true,
    },
    enjooVomit: {
        type: Boolean,
    },
    dorEstomago: {
        type: Boolean,
    },
    malEstar: {
        type: Boolean,
    },
    suores: {
        type: Boolean,
    },
    outros: {
        type: Boolean,
    },
    outrosDesc: {
        type: String,
    },
    dorAbdomenEsq: {
        type: Boolean,
    },
    dorAbdomenDir: {
        type: Boolean,
    },
    dorAbdomen: {
        type: Boolean,
    },
    sintomaPersiste: {
        type: Boolean,
        require: true,
    },
    qualSintoma: {
        type: String,
    },
    novoSintoma: {
        type: Boolean,
        require: true,
    },
    qualNovoSintoma: {
        type: String,
    },
    reposoDoisDias: {
        type: Boolean,
        require: true,
    },
    complicacaoPosCirurgico: {
        type: Boolean,
        require: true,
    },
    inflamacao: {
        type: Boolean,
    },
    hemorragia: {
        type: Boolean,
    },
    infeccao: {
        type: Boolean,
    },
    outras: {
        type: Boolean,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    observacao: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const FrmIntercorrencia = mongoose.model('frmIntercorrencia', frmIntercorrenciaSchema);

module.exports = FrmIntercorrencia;