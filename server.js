const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./src/config/db.js");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'id'],
  credentials: true, 
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
