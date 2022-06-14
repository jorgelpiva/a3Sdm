const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmDadosHosp = require('../models/FrmDadosHosp');

const router = express.Router();

router.use(authMiddleware);

router.get('/:frmDadosHospId', async (req, res)=>{
    try{
        const frmDadosHosp = await FrmDadosHosp.findById(req.params.frmDadosHospId).populate('patient');
        return res.send ({ frmDadosHosp });

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading form Dados Hospitalares'});
    }
    
});

router.post('/', async (req, res)=>{
   try{
    const { cpre, dtcpre, bariatrica, medContinuo, medContinuoDesc, alcoolismo, alcoolismofreq, fumante, qtdCigarros, tpFumante, doencaPre,  qualDoencaPre,  calculoBiliar } = req.body;

    const frmDadosHosp = await FrmDadosHosp.create({ cpre, dtcpre, bariatrica, medContinuo, medContinuoDesc, alcoolismo, alcoolismofreq, fumante, qtdCigarros, tpFumante, doencaPre,  qualDoencaPre,  calculoBiliar, patient: req.userId }); 

    return res.send({ frmDadosHosp })
    
   }catch (err){
    console.log(err)
        return res.status(400).send({ error: 'Error creating new form Dados Hospitalares'});
   }
});

router.put('/:frmDadosHospId', async (req, res)=>{
    try{
        const { cpre, dtcpre, bariatrica, medContinuo, medContinuoDesc, alcoolismo, alcoolismofreq, fumante, qtdCigarros, tpFumante, doencaPre,  qualDoencaPre,  calculoBiliar } = req.body;
        await FrmDadosHosp.findByIdAndUpdate(req.params.frmDadosHospId,{
            '$set': {
                cpre  : cpre, 
                dtcpre  : dtcpre, 
                bariatrica  : bariatrica, 
                medContinuo   : medContinuo, 
                medContinuoDesc : medContinuoDesc, 
                alcoolismo : alcoolismo, 
                alcoolismofreq : alcoolismofreq, 
                fumante : fumante, 
                qtdCigarros : qtdCigarros, 
                tpFumante : tpFumante, 
                doencaPre : doencaPre,  
                qualDoencaPre : qualDoencaPre,  
                calculoBiliar : calculoBiliar,
            }
        });
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't update form Dados Hospitalares"});
    } 
});

router.delete('/:frmDadosHospId', async (req, res)=>{
    try{
        await FrmDadosHosp.findByIdAndRemove(req.params.frmDadosHospId);
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't form Dados Hospitalares"});
    }
    
});

module.exports = app => app.use('/dados-hospitalares', router);