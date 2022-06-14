const mongoose = require('../../src/database');

const frmDadosHospSchema = new mongoose.Schema({
    
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


const frmDadosHosp = mongoose.model('frmDadosHosp', frmDadosHospSchema);

module.exports = frmDadosHosp;