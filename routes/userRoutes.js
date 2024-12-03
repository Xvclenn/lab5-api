const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    getUserLocations,
    getUserOneLocation,
    addUserLocation,
    editUserLocation,
    deleteUserLocation,
    getAllLocations,
} = require("../controllers/userController");

// User routes
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID

// User location routes
router.get("/:id/locations", getUserLocations); // Get all locations for a user
router.get("/:userId/locations/:locationId", getUserOneLocation); // Get a specific location for a user
router.post("/:userId/locations", addUserLocation); // Add a new location to a user
router.put("/:userId/locations/:locationId", editUserLocation); // Edit a user's location
router.delete("/:userId/locations/:locationId", deleteUserLocation); // Delete a user's location

// General locations route
router.get("/locations/all", getAllLocations); // Get all locations

module.exports = router;
