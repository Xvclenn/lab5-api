//models/User.js
const mongoose = require("mongoose");
const Location = require("./Location");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        locations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Location",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
