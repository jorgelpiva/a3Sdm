const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmPreCirurgico = require('../models/FrmPreCirurgico');

const router = express.Router();

router.use(authMiddleware);

router.get('/:frmPreCirurgicoId', async (req, res)=>{
    try {
        const frmPreCirurgico = await FrmPreCirurgico.findById(req.params.frmPreCirurgicoId).populate('patient');
        return res.send ({ frmPreCirurgico });

    }catch(err){
        return res.status(400).send({ error: 'Error loading form Pre Cirurgico'});
    }
    
});

router.post('/', async (req, res)=>{
   try{
    const { acompPre, examPre, sangue, image, outros, observ, resultAnt } = req.body;

    const frmPreCirurgico = await FrmPreCirurgico.create({ acompPre, examPre, sangue, image, outros, observ, resultAnt, patient: req.userId }); 

    return res.send({ frmPreCirurgico })

   }catch (err){
    console.log(err)
        return res.status(400).send({ error: 'Error creating new form Pre Cirurgico'});
   }
});

router.put('/:frmPreCirurgicoId', async (req, res)=>{
    try{
        const { acompPre, examPre, sangue, image, outros, observ, resultAnt } = req.body;
        await FrmPreCirurgico.findByIdAndUpdate(req.params.frmPreCirurgicoId,{
            '$set': {
                acompPre  : acompPre, 
                examPre  : examPre, 
                sangue  : sangue, 
                image   : image, 
                outros : outros, 
                observ : observ, 
                resultAnt : resultAnt,  
                
            }
        });
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't update form Pre Cirurgico"});
    } 
});

router.delete('/:frmPreCirurgicoId', async (req, res)=>{
    try{
        await FrmPreCirurgico.findByIdAndRemove(req.params.frmPreCirurgicoId);
        return res.send ();

    }catch(err){

        return res.status(400).send({ error: "We can't form Pre Cirurgico"});
    }
    
});

module.exports = app => app.use('/pre-cirurgico', router);

