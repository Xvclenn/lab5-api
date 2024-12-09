//models/Location.js
const mongoose = require("mongoose");
const User = require("./User");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    lat: {
        type: String,
        required: true,
    },
    long: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Location", locationSchema);
