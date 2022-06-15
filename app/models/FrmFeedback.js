const mongoose = require('../../src/database');

const frmFeedBackSchema = new mongoose.Schema({

    orientPosOp: {
        type: Boolean,
        require: true
    },

    repouso: {
        type: Boolean,
        require: true
    },

    dieta: {
        type: Boolean,
        require: true
    },
    retornMed: {
        type: Boolean,
        require: true
    },

    outros: {
        type: Boolean,
        require: true
    },

    sentePreOp: {
        type: String
    },

    sugest: {
        type: String
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const FrmFeedBack = mongoose.model('frmFeedBack', frmFeedBackSchema);

module.exports = FrmFeedBack;