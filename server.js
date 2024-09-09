const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/config/db.js');
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

// Configure CORS to allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', function (req, res) {
  res.send('Congratulation! Your server is running on port 5001!')
});

const userRouter = require('./src/routes/user.route.js');
app.use('/user', userRouter);

const projectRouter = require('./src/routes/project.route.js');
app.use('/project', projectRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
