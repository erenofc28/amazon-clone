const mongoose  = require('mongoose');

const userSchema =new mongoose.Schema(
    {
    id: Number,
    message: String,
    },
    { timestamps: true}
    
    );

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;