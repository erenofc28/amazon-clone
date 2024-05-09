const express = require("express");
const app = express();

const mongoose =  require("mongoose");
// const mongoose = require("mongoose");
const cors = require("cors")

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/node")
.then(()=>{console.log("connected")})
.catch((err)=>{console.log(err)})

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    phoneNumber:Number,
    adhaarNumber:Number,
    education:String,
    keySkills:String,
    experience:Number
})

const model = mongoose.model("novitech_final",schema);

app.post("/",async(req,res)=>{
    const {name,email,password,address,phoneNumber,adhaarNumber,education,keySkills,experience } = req.body;
    try {
     const neww= new model({name,email,password,address,phoneNumber,adhaarNumber,education,keySkills,experience});
     await neww.save();
     res.status(201).json(neww);
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }

})


const port =3000;
app.listen(port,()=>{
    console.log("server is running")
})