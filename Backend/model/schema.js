const mongoose = require('mongoose');

const todoSchema= new mongoose.Schema({
    task:{
        type: String,
        require:true
    }
})

const TODOtask= new mongoose.model("TODOschema", todoSchema)

module.exports= TODOtask;