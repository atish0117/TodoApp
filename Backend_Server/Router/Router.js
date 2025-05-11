const AddTodo = require("../Controller/AddTodo");
const DeleteTodo = require("../Controller/DeleteTodo");
const UpdateTodo = require("../Controller/UpdateTodo");
const GetTodo = require("../Controller/GetTodo")
const LoginTodo = require("../LoginController/LoginTodo")
const SignUpTodo = require("../LoginController/SignUpTodo")
const express = require("express");
const router = express.Router();

    // Addd new Todo
    router.post("/addTodo", AddTodo);

        // show all Todo
    router.get("/todos", GetTodo);

        // Update Todo
    router.put("/updateTodo",UpdateTodo);

        // Delete Todo
    router.delete("/deleteTodo",DeleteTodo);

    // LoginTodo Route
    router.post("/login",LoginTodo);

    // soignupTodo Route
    router.post("/signup",SignUpTodo);


    module.exports = router;