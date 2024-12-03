const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    mongoose
        .connect(process.env.MONGO_URI)

        .then(() => {
            console.log("MongoDB connected successfully ✅");
        })
        .catch(() => {
            console.log("MongoDB connection failed ❌");
        });
};

module.exports = connectDB;
