const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = "users.json";

// Read users from file
const readUsersFromFile = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Write users to file
const writeUsersToFile = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Register user
app.post("/api/register", (req, res) => {
    const { username, password, image } = req.body;
    const users = readUsersFromFile();

    const newUser = {
        id: uuidv4(),
        username,
        password,
        image,
        locations: [],
    };

    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
});

// Login user
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const users = readUsersFromFile();
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Get all users
app.get("/api/users", (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// Get user locations
app.get("/api/users/:id/locations", (req, res) => {
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === req.params.id);

    if (user) {
        res.json(user.locations);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Get specific user location by ID
app.get("/api/users/:userId/locations/:locationId", (req, res) => {
    const { userId, locationId } = req.params;
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === userId);

    if (user) {
        const location = user.locations.find((loc) => loc.id === locationId);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: "Location not found" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.get("/api/users/locations", (req, res) => {
    const users = readUsersFromFile();
    const usersWithLocations = users.map((user) => ({
        id: user.id,
        username: user.username,
        image: user.image,
        locations: user.locations,
    }));
    res.json(usersWithLocations);
});

app.post("/api/users/:id/locations", (req, res) => {
    const { name, description, lat, long, image } = req.body;
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === req.params.id);

    if (user) {
        // Create a new location with a unique ID
        const newLocation = {
            id: uuidv4(), // Generate a unique ID for the new location
            name,
            description,
            lat,
            long,
            image,
        };

        user.locations.push(newLocation);
        writeUsersToFile(users);
        res.status(201).json(newLocation); // Return the created location
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Edit location
app.put("/api/users/:userId/locations/:locationId", (req, res) => {
    const { userId, locationId } = req.params;
    const { name, description, lat, long, image } = req.body;
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === userId);

    if (user) {
        const locationIndex = user.locations.findIndex(
            (loc) => loc.id === locationId
        );
        if (locationIndex !== -1) {
            // Update location
            user.locations[locationIndex] = {
                ...user.locations[locationIndex],
                name,
                description,
                lat,
                long,
                image,
            };
            writeUsersToFile(users);
            res.json(user.locations[locationIndex]);
        } else {
            res.status(404).json({ message: "Location not found" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete location
app.delete("/api/users/:userId/locations/:locationId", (req, res) => {
    const { userId, locationId } = req.params;
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === userId);

    if (user) {
        const locationIndex = user.locations.findIndex(
            (loc) => loc.id === locationId
        );
        if (locationIndex !== -1) {
            user.locations.splice(locationIndex, 1);
            writeUsersToFile(users);
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ message: "Location not found" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
