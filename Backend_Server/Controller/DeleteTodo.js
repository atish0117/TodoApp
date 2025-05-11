const mongoose = require("mongoose");
const TodoModel =require("../Models/todoSchema")

const DeleteTodo = async(req, res)=>{
    try {
        const {id}= req.body;

            if(!id){
                return res.status(400).json({
                    suiccess:false,
                    message:"Todo Id is required or not found ID",
                })
            }
        const Deletedtodo = await TodoModel.findByIdAndDelete(id);

        if(!Deletedtodo){
            return res.status(400).json({
                success:false,
                message:"Todo no found with this Id",
            });
        }

        return res.status(200).json({
            success:true,
            message:"Todo deleted Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage :"Error deleting Todo, Todo delete nhi hua hai",
            error:error.message,
        })
    }
}

module.exports= DeleteTodo