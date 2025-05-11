const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.cookie_token; // Using cookie-parser middleware

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using secret
        req.user = decoded; // decoded contains user information like userId, email, etc.
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
