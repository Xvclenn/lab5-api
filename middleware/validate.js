const { body, validationResult } = require("express-validator");

exports.validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("image").optional().isURL().withMessage("Invalid image URL"),
];

exports.validateLogin = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
