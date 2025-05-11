const mongoose = require("mongoose")
const TodoModel = require("../Models/todoSchema");

const UpdateTodo = async(req, res)=>{
    try{
            const {id, textdata}= req.body;
            if(!id){
                return res.status(400).json({
                    success:false,
                    message:"please provide id for update the todo item",

                });
            }

            const UpdatedTodo = await TodoModel.findByIdAndUpdate(id ,{textdata:textdata.trim()}, {new:true})

            if(!UpdatedTodo){
                return res.status(404).json({
                    success:false,
                    message:"updated Todo not found",
                });
            }

            return res.status(200).json({
                success:true,
                message:"updated Successfully",
                data:UpdatedTodo,
            })
    }       

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error updating Todo item, please try again",
        });
    }
}

module.exports = UpdateTodo;