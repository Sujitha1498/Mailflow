
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("MailFlow Backend is Running!");
});

// Email routes
const emailRoutes = require("./routes/emailRoutes");
app.use("/api/email", emailRoutes);

// Start server (without MongoDB)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
