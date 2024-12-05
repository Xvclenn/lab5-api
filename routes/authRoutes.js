const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
    validateRegister,
    handleValidationErrors,
    validateLogin,
} = require("../middleware/validate");

router.post(
    "/register",
    validateRegister,
    handleValidationErrors,
    authController.register
);

router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    authController.login
);

module.exports = router;
