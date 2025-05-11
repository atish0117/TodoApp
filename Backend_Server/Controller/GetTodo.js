const TodoModel= require("../Models/todoSchema");

const GetTodo= async(req,res)=>{
    try{
        const Todo = await TodoModel.find({});

        if(!Todo.length){
            return res.status(404).json({
                success:false,
                message:"Todo List is Empty",
            });
        }
        return res.status(200).json({
            success:true,
            length:Todo.length,
            data:Todo,

        });
    }
    catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in fetching Data",
                error:error.message,
            });
    }
}

module.exports = GetTodo;