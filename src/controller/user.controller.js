const generateToken = require("../config/jwtProvider");
const User = require("../models/user.model");

// register api
const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      address,
      role,
      mobileNumber,
      businessName,
    } = req.body;

    if (fullName.length < 4) {
      return res.status(400).json({
        message: "Full Name length should be greater than 4 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password length should be greater than 6 characters",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const existingMobileNumber = await User.findOne({
      mobileNumber: mobileNumber,
    });
    if (existingMobileNumber) {
      return res
        .status(400)
        .json({ message: "Mobile number already exists, you can login" }); // Fixed message
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password,
      businessName: businessName,
      mobileNumber: mobileNumber, // Correctly using mobileNumber
      address: address,
      role: role,
    });
    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
    };

    const token = generateToken(payload);

    return res.status(201).json({
      message: "You have Registered successfully",
      data: savedUser,
      token: token,
    });
  } catch (error) {
    console.log("User registration controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register };

//   login api
const login = async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const { email, password } = req.body;
    // console.log("email", email, "password", password);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const payload = {
      id: user._id,
    };
    const token = generateToken(payload);
    return res.status(200).json({
      message: "You have Logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log("user login controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get user profile api
const getUserprofile = async (req, res) => {
  try {
    // extract userid from req.user
    const userId = req.user.userId.id;

    // find the user using userid
    const user = await User.findById(userId).select("-password");

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "user not found with this id" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log("profile controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", users });
  } catch (error) {
    console.log("getAllUsers controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, getUserprofile, getAllUsers };
