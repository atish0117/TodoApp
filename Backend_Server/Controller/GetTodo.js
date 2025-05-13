const TodoModel= require("../Models/todoSchema");

const GetTodo= async(req,res)=>{
    try{
        const userEmail = req.user.email;
        const userTodo = await TodoModel.findOne({
            userEmail
        });

        // if no document exists yet, treat as empty list
    const tasks = userTodo ? userTodo.tasks : [];
        return res.status(200).json({
            success:true,
            length:tasks.length,
            data:tasks,

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