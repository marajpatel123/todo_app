const express=require('express');

const router=new express.Router();
const TODOtask=require('../model/schema');


//Code for Post Data at server
router.post('/todo-data', (req,res)=>{
    // console.log(req.body)
    const Todotask= new TODOtask(req.body)
    Todotask.save().then(()=>{
        res.status(201).send(Todotask);
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//Code for get Data From server
router.get('/todo-data', async(req,res)=>{
    try{
        const getTaskData= await TODOtask.find()
        // console.log(getTaskData)
        res.status(201).send(getTaskData)
    }catch(e){
        res.status(400).send(e);
    }
})

//Code for update task From server

router.patch('/todo-data/:id', async(req,res)=>{
    try{
        const _id= req.params.id;
        const updateData= await TODOtask.findByIdAndUpdate(_id , req.body,{
            new: true
        });
        console.log(updateData)
        res.status(201).send(updateData)
    }catch(e){
        res.status(400).send(e);
    }
})


//Code for Delete Task From server

router.delete('/todo-data/:id', async(req,res)=>{
    try{
        const _id=req.params.id;
        const deletedTask= await TODOtask.findByIdAndDelete(_id, req.body,{
            new:true
        })
        console.log(deletedTask);
        res.status(201).send(deletedTask)
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports=router;