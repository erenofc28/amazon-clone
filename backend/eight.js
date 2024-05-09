const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors())

const port = 7000;

mongoose.connect('mongodb://localhost:27017/node')
.then(()=>{console.log("connected")})
.catch((err)=>{console.log(err)})

const schema = new mongoose.Schema({
    id:Number,
    name:String
})

const model = mongoose.model("user",schema);


app.post('/data',async(req,res)=>{
    const {id,name}=req.body;

    try {
        const newdata = new model({id,name});
        await newdata.save();
        res.status(201).json(newdata);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
        
    }

})

app.get('/data',async(req,res)=>{
   

        try {
            const find = await model.find();
            res.status(201).json(find)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
})

app.put('/data/:b',async(req,res)=>{
    try {  
    const b = req.params.b;
    const {id,name} = req.body;
    const updated = await model.findByIdAndUpdate(b,{id,name},{new:true});
    if (!updated) {
        return res.status(404).json({message:"not found"})
    } else {
        return res.json(updated)
    }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }


})

app.delete('/data/:id',async (req,res)=>{

    try {
            const id = req.params.id;
    const deleted = await model.findByIdAndDelete(id);
    res.status(204).end();
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})


// app.delete('/todo/:id',async (req,res)=>{
//     try {
//         const id = req.params.id;
//         await model.findByIdAndDelete(id);
//         res.status(204).end();
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: error.message})
        
//     }
// })






app.listen(port,()=>{
    console.log("server connected");
})





















