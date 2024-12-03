const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model

// Register a new user
exports.register = async (req, res) => {
    const { username, password, image } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username is already taken" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            image,
        });

        // Save the user to the database
        await newUser.save();

        // Return success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, "your_secret_key", {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Return the token and user info
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                image: user.image,
                locations: user.locations,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
