const express = require('express')
const port = process.env.PORT || 5000;
const cors= require('cors')
require('./Connection/conn')
require('./model/schema')
const TaskRouter= require('./Router/task')
const app = express()

app.use(express.json())
app.use(cors())
app.use(TaskRouter)
app.get('/', (req,res)=>{
    res.send('Hello i am Home Page..')
})

app.listen(port,()=>{
    console.log(`App is running on the port ${port}`)
})
