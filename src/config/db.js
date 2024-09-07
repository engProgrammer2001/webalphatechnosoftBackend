const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.mongo_Db_Host_Url; 


mongoose.connect(mongoUrl , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



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
