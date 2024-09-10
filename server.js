const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./src/config/db.js");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

// Allow localhost:3000 and other necessary headers
const corsOptions = {
  origin: 'https://webalphatechnosoft1.netlify.app/',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Authorization,Content-Type',
  credentials: true,
};

app.use(cors(corsOptions));

// Add logging to check if CORS is applied
app.use((req, res, next) => {
  console.log('CORS headers are set');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get('/', function (req, res) {
  res.send('Congratulations! Your server is running on port 5001!');
});

// Routes
const userRouter = require('./src/routes/user.route.js');
app.use('/user', userRouter);

const projectRouter = require('./src/routes/project.route.js');
app.use('/project', projectRouter);

const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
