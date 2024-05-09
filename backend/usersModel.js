const mongoose = require("mongoose");



const schema = new mongoose.Schema({
    
    email:String,
    name:String,
    password:String,
    add_product:[{
        title:String,
        image:String,
        price:Number,
        rating:Number
    }]
        

  
})

module.exports = mongoose.model("usersModel",schema)