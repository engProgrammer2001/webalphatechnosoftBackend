const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_DB_URL; 


// mongoose.connect(mongoUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(mongoUrl);


mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected MongoDB server");
});

db.on("error", () => {
  console.log("MangoDB connection error");
});

db.on("disconnected", () => {
  console.log("MongoDB connection is disconnected");
});


module.exports = db;
