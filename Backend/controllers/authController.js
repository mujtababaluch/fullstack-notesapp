const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                "statuscode": 400,
                "successcode": false,
                "message": "User already exists",
                "data": []
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });

        await user.save();

        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "User registered successfully",
            "data": []
        });

    } catch (error) {
        return res.status(500).json({
            "statuscode": 500,
            "successcode": false,
            "message": "Server error",
            "data": []
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                "statuscode": 400,
                "successcode": false,
                "message": "User not found",
                "data": []
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                "statuscode": 400,
                "successcode": false,
                "message": "Invalid credentials",
                "data": []
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "Login successful",
            "data": { "token":token }
        });

    } catch (error) {
        return res.status(500).json({
            "statuscode": 500,
            "successcode": false,
            "message": "Server error",
            "data": []
        });
    }
};

module.exports = { signup, login };
