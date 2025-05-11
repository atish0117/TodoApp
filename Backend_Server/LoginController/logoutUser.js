const logoutUser = (req, res) => {
    res.clearCookie("cookie_token", {
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = logoutUser;
