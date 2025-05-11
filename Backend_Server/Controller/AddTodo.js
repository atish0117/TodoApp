const TodoModel = require("../Models/todoSchema");

const AddTodo = async (req, res) => {
  try {
    const { textdata } = req.body;
    const userEmail = req.user.email; // Get email from token

    if (!textdata || !textdata.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid text",
      });
    }

    let userTodo = await TodoModel.findOne({ userEmail });

    if (!userTodo) {
      // If user has no todos, create a new document
      userTodo = new TodoModel({ userEmail, tasks: [{ textdata: textdata.trim() }] });
    } else {
      // If user exists, push a new task to their array
      userTodo.tasks.push({ textdata: textdata.trim() });
    }

    await userTodo.save();

    return res.status(200).json({
      success: true,
      message: "Todo added successfully",
      data: userTodo.tasks,
    });
  } catch (error) {
    console.error("Error adding todo:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add Todo",
      error: error.message,
    });
  }
};

module.exports = AddTodo;
