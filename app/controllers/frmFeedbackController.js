const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmFeedback = require('../models/FrmFeedback');

const router = express.Router();

router.use(authMiddleware);


router.get('/:frmFeedbackId', async (req, res)=>{
    try{
        const frmFeedback = await FrmFeedback.findById(req.params.frmFeedbackId).populate('patient');
        return res.send ({ frmFeedback });

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading form Feedback'});
    }
    
});

router.post('/', async (req, res)=>{
   try{
    const { orientPosOp, repouso, dieta, retornMed, outros, sentePreOp, sugest  } = req.body;

    const frmFeedback = await FrmFeedback.create({ orientPosOp, repouso, dieta, retornMed, outros, sentePreOp,sugest, patient: req.userId }); 

    return res.send({ frmFeedback })

   }catch (err){
    console.log(err)
        return res.status(400).send({ error: 'Error creating new form Feedback'});
   }
});

router.put('/:frmFeedbackId', async (req, res)=>{
    try{
        const { orientPosOp, repouso, dieta, retornMed, outros, sentePreOp, sugest } = req.body;
        await FrmFeedback.findByIdAndUpdate(req.params.frmFeedbackId,{
            '$set': {
                orientPosOp  : orientPosOp, 
                repouso  : repouso, 
                dieta  : dieta, 
                retornMed   : retornMed, 
                outros : outros, 
                sentePreOp : sentePreOp,          
                sugest : sugest      
            }
        });
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't update form Feedback"});
    } 
});

router.delete('/:frmFeedbackId', async (req, res)=>{
    try{
        await FrmFeedback.findByIdAndRemove(req.params.frmFeedbackId);
        return res.send ();

    }catch(err){
        return res.status(400).send({ error: "We can't form Feedback"});
    }
    
});

module.exports = app => app.use('/feedback', router);