const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./config/db.js')
const bodyParser = require("body-parser");
const path = require("path");
require ('dotenv').config()


app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get('/', function (req, res) {
  res.send('Congratulation! Your server is running on port 5001!')
})


const userRouter = require('./routes/user.route.js');
app.use('/user', userRouter);

const projectRouter = require('./routes/project.route.js');
app.use('/project', projectRouter);


const PORT = process.env.PORT || 5001;

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
}) 