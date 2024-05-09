const mongoose = require("mongoose");



const schema = new mongoose.Schema({
        price:Number,
        products:[
            {
                image:String,
                price:Number,
                title:String
            }
        ],
        payment:{
            type:Boolean,
            required:true},
        email:String,
        address:[{
            name:String,
            phoneNumber:Number,
            flat:String,
            area:String,
            landmark:String,
            town:String,
            state:String

        }]
    
   
  
})

module.exports = mongoose.model("orderModel",schema)