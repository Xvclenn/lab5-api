const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send(`API is running on ${PORT} : Port`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
