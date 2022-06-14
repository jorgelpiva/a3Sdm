const mongoose = require('../../src/database');

const frmDadosHospSchema = new mongoose.Schema({
    sintCpre: {
        type: Boolean,
        require: true,
    },
    enjooVomit: {
        type: Boolean,
    },
    bariatrica: {
        type: Boolean,
        require: true,
    },
    medContinuo: {
        type: Boolean,
        require: true,
    },
    medContinuoDesc: {
        type: String,
    },
    alcoolismo: {
        type: Boolean,
        require: true,
    },
    alcoolismofreq: {
        type: String,
    },
    fumante: {
        type: Boolean,
        require: true,
    },
    qtdCigarros: {
        type: Number,
    },
    tpFumante: {
        type: Number,
    },
    doencaPre: {
        type: Boolean,
        require: true,
    },
    qualDoencaPre: {
        type: String,
    },
    calculoBiliar: {
        type: Boolean,
        require: true,
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

const frmDadosHosp = mongoose.model('frmDadosHosp', frmDadosHospSchema);

module.exports = frmDadosHosp;