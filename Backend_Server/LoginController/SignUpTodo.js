const signupModel = require("../Models/signUpSchema");
const bcrypt = require("bcrypt");

const SignUpTodo = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate input fields
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Ensure password is at least 6 characters
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

        // Convert email to lowercase for uniqueness
        const lowercasedEmail = email.toLowerCase();

        // Check if user already exists
        const userExist = await signupModel.findOne({ email: lowercasedEmail });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new signupModel({
            userName,
            email: lowercasedEmail,
            password: hashedPassword,
            createdAt: new Date(),
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message,
        });
    }
};

module.exports = SignUpTodo;
