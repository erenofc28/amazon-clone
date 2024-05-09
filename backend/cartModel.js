const mongoose = require("mongoose");



const schema = new mongoose.Schema({

    email:String,
    title:String,
    image:String,
    price:Number
 
  
})

module.exports = mongoose.model("cartModel",schema)