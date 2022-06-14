const express = require("express");
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res)=>{
    try{
        const projects = await Project.find().populate('user');
        return res.send ({ projects });

    }catch(err){
        return res.status(400).send({ error: 'Error loading projects'});
    }
    
});

router.get('/:projectId', async (req, res)=>{
    try{
        const project = await Project.findById(req.params.projectId).populate('user');
        return res.send ({ project });

    }catch(err){
        return res.status(400).send({ error: 'Error loading project'});
    }
    
});

router.post('/', async (req, res)=>{
   try{
    const { title, description } = req.body;

    const project = await Project.create({ title, description, user: req.userId }); 

    return res.send({ project })

   }catch (err){
        return res.status(400).send({ error: 'Error creating new project'});
   }
});

router.put('/:projectId', async (req, res)=>{
    try{
        const { title, description } = req.body;
        await Project.findByIdAndUpdate(req.params.projectId,{
            '$set': {
                title: title,
                description: description,
            }
        });
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't update this project"});
    } 
});

router.delete('/:projectId', async (req, res)=>{
    try{
        await Project.findByIdAndRemove(req.params.projectId);
        return res.send ();

    }catch(err){
        console.log(err)
        return res.status(400).send({ error: "We can't delete this project"});
    }
    
});

module.exports = app => app.use('/projects', router);