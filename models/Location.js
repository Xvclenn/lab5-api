//models/Location.js
const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Location", locationSchema);
