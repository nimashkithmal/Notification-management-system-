const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/gem_db";

if (!MONGODB_URL) {
    console.error("[❌] MONGODB_URL is not defined in .env file");
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URL)
    .then(() => console.log("[✅] MongoDB connection successful!"))
    .catch((err) => console.error("[❌] MongoDB connection error:", err));

// Routes
const NotificationsRouter = require("./routes/Notifications.js");
app.use("/Notifications", NotificationsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`[🚀] Server is running on port number: ${PORT}`);
});