const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const DBconnect = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error("DB_URL is not defined in .env file");
        }

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); // Removed unnecessary options
        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = DBconnect;
