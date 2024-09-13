const Project = require("../models/project.model"); // Import the Project model
const multer = require("multer");
const fs = require("fs"); // Import filesystem module
const path = require("path"); // Import path module



// Ensure 'uploads/' directory exists
const uploadDirectory = 'uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer for single file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('image'); // Single file upload for 'image' field

// Controller to create a new project
const createProject = async (req, res) => {
  // Using multer middleware to handle file uploads
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const imagePath = req.file.path; // Get file path of the uploaded image

      const { title, highlights, shortDescription, longDescription } = req.body;

      const newProject = new Project({
        image: imagePath, // Store single image path
        title,
        highlights,
        shortDescription,
        longDescription,
      });

      // Save the project to the database
      await newProject.save();

      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

module.exports = { createProject };


// Controller for updating project
const updateProject = async (req, res) => {
  // Using multer middleware to handle file uploads
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading files", error: err.message });
    }

    try {
      const projectId = req.params.id; // Get project ID from request params

      // Check if project exists
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Get file paths of uploaded images
      let imagePaths = project.images; // Keep existing images by default
      if (req.files && req.files.length > 0) {
        // Delete old images
        project.images.forEach((image) => {
          if (fs.existsSync(image)) {
            fs.unlinkSync(image);
          }
        });

        // Assign new images
        imagePaths = req.files.map((file) => file.path);
      }

      // Extract other fields from the request body
      const { title, highlights, shortDescription, longDescription } = req.body;

      // Update project details
      project.title = title || project.title;
      project.highlights = highlights || project.highlights;
      project.shortDescription = shortDescription || project.shortDescription;
      project.longDescription = longDescription || project.longDescription;
      project.images = imagePaths;

      // Save the updated project to the database
      await project.save();

      res
        .status(200)
        .json({ message: "Project updated successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// delete project details
// Controller to delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id; // Get project ID from request params
    // console.log("projectId", projectId);

    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete project image from the server
    const imagePath = path.resolve(__dirname, '..', 'uploads', project.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete image file
    }

    // Delete project from the database
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};

// Controller to get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting projects", error: error.message });
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  }
};

// find project by id
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting project", error: error.message });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
};
