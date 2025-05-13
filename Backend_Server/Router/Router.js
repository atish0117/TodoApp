const AddTodo = require("../Controller/AddTodo");
const DeleteTodo = require("../Controller/DeleteTodo");
const UpdateTodo = require("../Controller/UpdateTodo");
const GetTodo = require("../Controller/GetTodo")
const LoginTodo = require("../LoginController/LoginTodo")
const SignUpTodo = require("../LoginController/SignUpTodo")
const express = require("express");
const router = express.Router();
const verifyToken= require("../Middleware/verifyToken");
const logoutUser = require("../LoginController/logoutUser");

// Protected route
router.get("/protectedRoute", verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Access granted to protected route",
        user: req.user // Contains user info decoded from the JWT
    });
});

    // Addd new Todo
    router.post("/addTodo",verifyToken, AddTodo);

        // show all Todo
    router.get("/todos",verifyToken, GetTodo);

        // Update Todo
    router.put("/updateTodo",UpdateTodo);

        // Delete Todo
    router.delete("/deleteTodo",DeleteTodo);

    // LoginTodo Route
    router.post("/login",LoginTodo);

    // soignupTodo Route
    router.post("/signup",SignUpTodo);

    // logout route \
    router.get("logout",logoutUser)

    module.exports = router;