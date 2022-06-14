const mongoose = require('../../src/database');

const frmDadosHospSchema = new mongoose.Schema({

orientPosOp:{
    type:Boolean,
    require: true
},

repouso:{
    type:Boolean,
    require:true
},

dieta:{
    type:Boolean,
    require:true
},
retornMed:{
    type:Boolean,
    require:true
},

outros:{
    type:Boolean,
    require:true
},

sentePreOp:{
    type:String
},

sugest:{
    type:String
}


});

const frmDadosHosp = mongoose.model('frmDadosHosp', frmDadosHospSchema);

module.exports = frmDadosHosp;