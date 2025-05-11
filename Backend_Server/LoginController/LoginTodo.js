const signupModel = require("../Models/signUpSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv= require("dotenv").config()
const LoginTodo = async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        // validation
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"all fields are required",
            })
        }
        // check if user exist
        const user =await signupModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"invalid email or password"
            });
        }
        // compare password
        const ismatch=  await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(404).json({
                success:false,
                message:"invalid password",
            });
        }
        console.log("ismatch",ismatch)
      //  Generate JWT Token
        const token =jwt.sign({ userId: user._id, email: user.email } ,process.env.SECRET_KEY,{expiresIn:"1h"});
        console.log("token",token)

        //  Set token in HTTP-Only Cookie
        res.cookie("cookie_token",token,{
            httpOnly:true,
            maxAge: 3600000,
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token, // Return JWT token
        });
    }
    
    catch(error){
            console.log("Login function me eeror hai", error.message);
            return res.status(500).json({
                success:false,
                message:"login error"
            });
    }
}

module.exports = LoginTodo;