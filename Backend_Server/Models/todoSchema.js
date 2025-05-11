const mongoose = require("mongoose")

const Todo_Schema= new mongoose.Schema(
    {
        userEmail: {  // Link task to a specific user
            type: String,
            required: true,
            trim: true,
        },
        tasks:[{ textdata:{
                type:String,
                required:true,
                trim:true,
                minlength:3,
        },
        createdAt:{type:Date,
            required:true,
            default:Date.now(),
        },
        updateAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
    }]
    },
    {timestamps:true}
)

module.exports= mongoose.model("TodoModel",Todo_Schema);
