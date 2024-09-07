// Import mongoose
const mongoose = require("mongoose");

// Define the schema for Project
const projectSchema = new mongoose.Schema({
  image: {
    type: String, // Single image URL
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
});

// Create the Project model
const Project = mongoose.model("Project", projectSchema);
// Export the model
module.exports = Project;
