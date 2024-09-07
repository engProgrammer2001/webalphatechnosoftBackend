const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { jwtAuthMiddleware } = require('../middleware/jwtAuthMiddleware');



router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/profile",jwtAuthMiddleware, userController.getUserprofile);
router.get("/allusers",jwtAuthMiddleware, userController.getAllUsers);





module.exports = router;