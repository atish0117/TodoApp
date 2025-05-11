const mongoose = require("mongoose");

const SignUp_schema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }

})
module.exports= mongoose.model("signupModel", SignUp_schema);