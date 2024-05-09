const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors());

// const todos= []

mongoose.connect('mongodb://localhost:27017/node')
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})

const schema = new mongoose.Schema({
    
        title:{
            required:true,
            type:String
        },
        description : String
    
})

const model= mongoose.model('user',schema);

app.post('/todo',async (req,res)=>{
    const {title,description} = req.body;

    // const newtodo = {
    //     id:todos.length+1,
    //     title,
    //     description
    // }
    // todos.push(newtodo);
    try {
          const newtodo = new model({title,description})
          await newtodo.save();
           res.status(201).json(newtodo);
    }
     catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
 

   
    
})

app.get('/todo',async(req,res)=>{
    
    try {
         let todoo = await model.find();
         res.json(todoo);
    } catch (error) {
           console.log(error)
        res.status(500).json({message: error.message});
    }
    
    
   

})

app.put('/todo/:id',async(req,res)=>{


    try {
    const  {title,description} = req.body;
    const id = req.params.id;
   const update= await model.findByIdAndUpdate(id,{title,description},{new:true })
   if (!update) {
      return res.status(404).json({ message: "todo not found"})
   } else {
    res.json(update)
    
   }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }

})

app.delete('/todo/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        await model.findByIdAndDelete(id);
        res.status(204).end();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
})

app.listen(1000,()=>{
    console.log('server is running')
})