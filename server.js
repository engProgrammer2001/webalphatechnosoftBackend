const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/config/db');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// this is use to convert the json data to javascript object
app.use(express.json());
// Allow CORS from your frontend URL
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', function (req, res) {
  res.send('Congratulation! Your server is running on port 5001!');
});

const userRouter = require('./src/routes/user.route.js');
app.use('/user', userRouter);

const projectRouter = require('./src/routes/project.route.js');
app.use('/project', projectRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
