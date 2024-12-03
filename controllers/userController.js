const User = require("../models/User");
const Location = require("../models/Location");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("locations");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("locations");
        console.log(user);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all user locations
const getUserLocations = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("locations");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user.locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one specific location of a user
const getUserOneLocation = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate(
            "locations"
        );
        if (!user) return res.status(404).json({ error: "User not found" });

        const location = user.locations.find(
            (loc) => loc.id === req.params.locationId
        );
        if (!location)
            return res.status(404).json({ error: "Location not found" });

        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a location to a user
const addUserLocation = async (req, res) => {
    try {
        const { userId } = req.params;
        const locationData = req.body;

        const location = new Location(locationData);
        await location.save();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.locations.push(location._id);
        await user.save();

        res.status(201).json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit a user's location
const editUserLocation = async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.locationId,
            req.body,
            { new: true }
        );
        if (!updatedLocation)
            return res.status(404).json({ error: "Location not found" });
        res.status(200).json(updatedLocation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user's location
const deleteUserLocation = async (req, res) => {
    try {
        const { userId, locationId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.locations.pull(locationId);
        await user.save();

        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation)
            return res.status(404).json({ error: "Location not found" });

        res.status(200).json({ message: "Location deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserLocations,
    getUserOneLocation,
    addUserLocation,
    editUserLocation,
    deleteUserLocation,
    getAllLocations,
};
