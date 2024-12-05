const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Хүсэлт амжилтгүй: Токен байхгүй байна." });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Серверийн алдаа" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({
                    message: "Токений хугацаа дууссан байна. Дахин нэвтэрнэ үү",
                });
        }
        console.error("Token verification error:", error);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
