const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/config/db.js");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Additional middleware to set CORS headers manually (optional)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow specific origin
  next();
});

// Middleware to handle preflight requests
app.options("/user/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.sendStatus(204); // No Content
});
app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", function (req, res) {
  res.send("Congratulations! Your server is running on port 5757!");
});

// Routes
const userRouter = require("./src/routes/user.route.js");
app.use("/user", userRouter);

const projectRouter = require("./src/routes/project.route.js");
app.use("/project", projectRouter);

const PORT = process.env.PORT || 5757;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
