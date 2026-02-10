const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../auth/jwt");
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const { validateRegistration, validateLogin } = require('../middlewares/validators');

// Register
router.post("/register", validateRegistration, registerLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({
        error: "User Already Exists",
      });
    }

    const data = { name, email, password };
    const newUser = new User(data);

    // save the user to the database
    const response = await newUser.save();
    console.log("user registered");

    const payload = { id: response.id };
    const token = generateToken ? generateToken(payload) : null;

    return res.status(201).json({
      message: "registration successful",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", validateLogin, loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// User profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData.id);
    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// updating password
router.put("/profile/resetpassword", jwtAuthMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    // find the id
    const userId = req.user.id;

    // find the user with the id
    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;