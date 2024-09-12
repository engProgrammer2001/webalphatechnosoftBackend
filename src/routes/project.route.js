
const express = require('express');
const router = express.Router();
const projectController = require('../controller/project.controller');

router.post("/create", projectController.createProject);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);
router.get('/allprojects', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);



module.exports = router;


