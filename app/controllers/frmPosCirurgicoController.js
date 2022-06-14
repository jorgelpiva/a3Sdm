const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmPosCirurgico = require('../models/FrmPosCirurgico');

const router = express.Router();

router.use(authMiddleware);


router.get('/:frmPosCirurgicoId', async (req, res)=>{
    try{
        const frmPosCirurgico = await FrmPosCirurgico.findById(req.params.frmPosCirurgicoId).populate('patient');
        return res.send ({ frmPosCirurgico });

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading form Pos Cirurgico'});
    }
    
});

router.post('/', async (req, res)=>{
   try{
    const { acompPos, examPos, sangue, image, outros, observ,  } = req.body;

    const frmPosCirurgico = await FrmPosCirurgico.create({ acompPos, examPos, sangue, image, outros, observ, patient: req.userId }); 

    return res.send({ frmPosCirurgico })

   }catch (err){
    console.log(err)
        return res.status(400).send({ error: 'Error creating new form Pos Cirurgico'});
   }
});

router.put('/:frmPosCirurgicoId', async (req, res)=>{
    try{
        const { acompPre, examPre, sangue, image, outros, observ } = req.body;
        await FrmPosCirurgico.findByIdAndUpdate(req.params.frmPosCirurgicoId,{
            '$set': {
                acompPre  : acompPre, 
                examPre  : examPre, 
                sangue  : sangue, 
                image   : image, 
                outros : outros, 
                observ : observ,                
            }
        });
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't update form Pos Cirurgico"});
    } 
});

router.delete('/:frmPosCirurgicoId', async (req, res)=>{
    try{
        await FrmPosCirurgico.findByIdAndRemove(req.params.frmPosCirurgicoId);
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't form Pos Cirurgico"});
    }
    
});

module.exports = app => app.use('/pos-cirurgico', router);