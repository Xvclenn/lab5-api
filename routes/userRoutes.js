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
const verifyToken = require("../middleware/authMiddleware");

router.get("/", getAllUsers);
router.get("/:id", verifyToken, getUserById);

router.get("/:id/locations", getUserLocations);
router.get("/:userId/locations/:locationId", getUserOneLocation);
router.post("/:userId/locations", verifyToken, addUserLocation);
router.put("/:userId/locations/:locationId", verifyToken, editUserLocation);
router.delete(
    "/:userId/locations/:locationId",
    verifyToken,
    deleteUserLocation
);

router.get("/locations/all", getAllLocations);

module.exports = router;
