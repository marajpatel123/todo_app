const mongoose= require('mongoose');

const Url="mongodb+srv://rajpatel:ROYAL@todo-app.clvtd.mongodb.net/?retryWrites=true&w=majority&appName=Todo-App";

mongoose.connect(Url).then(()=>{
    console.log("Connection Seccussful");
}).catch((e)=>{
    console.error("Erron", e)
})