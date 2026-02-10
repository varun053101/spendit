const express = require("express");
const router = express.Router();
const User = require("../models/User");
// Register
router.post("/register", async (req, res) => {
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

    return res.status(201).json({
      message: "User registered successfully"
    });
    
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", (req, res) => {
  res.send("Login route");
});

module.exports = router;
