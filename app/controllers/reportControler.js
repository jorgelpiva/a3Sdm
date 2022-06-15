const express = require("express");
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');
const FrmDadosHosp = require('../models/FrmDadosHosp');
const FrmFeedback = require('../models/FrmFeedback');
const FrmInterCorrencia = require('../models/FrmFeedback');
const FrmPosCirurgico = require('../models/FrmPosCirurgico');
const FrmPreCirurgico = require('../models/FrmPreCirurgico');
const FrmProcedimento = require('../models/FrmProcedimento');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res)=>{
    try{
        const {admin} = await User.findById(req.userId)
        if(!admin)
            return res.status(400).send({ error: "You don't have access to this report"});
        const pacientes = await User.find()
        const dadosHosp = await FrmDadosHosp.find()
        const frmFeedback = await FrmFeedback.find()
        const frmInterCorrencia = await FrmInterCorrencia.find()
        const frmPosCirurgico = await FrmPosCirurgico.find()
        const frmPreCirurgico = await FrmPreCirurgico.find()
        const frmProcedimento = await FrmProcedimento.find()
        return res.send (
        { 
            "dados": {
            "pacientes": pacientes,
            "dadosHosp": dadosHosp,
            "frmFeedback": frmFeedback,
            "frmInterCorrencia": frmInterCorrencia,
            "frmPosCirurgico": frmPosCirurgico,
            "frmPreCirurgico": frmPreCirurgico,
            "frmProcedimento": frmProcedimento
        }});  
        }catch(err){
            return res.status(400).send({ error: 'Error loading report'});
        }
});

module.exports = app => app.use('/report', router);