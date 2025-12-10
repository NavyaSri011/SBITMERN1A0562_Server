const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { uname, password, role } = req.body;

    if (!uname || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ uname });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ uname, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration Failed", error: err.message });
  }
});

// LOGIN  ✅ corrected version with role check
router.post("/login", async (req, res) => {
  try {
    const { uname, password, role } = req.body;

    // ❗ Role is required
    if (!uname || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❗ Check username + role together
    const user = await User.findOne({ uname, role });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or role" });
    }

    // Password check
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, uname: user.uname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      uname: user.uname,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
});

// LOGOUT (Protected)
router.post("/logout", verifyToken, async (req, res) => {
  try {
    const user = req.user?.uname || "User";
    res.status(200).json({ message: `${user} logged out successfully.` });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout Failed", error: err.message });
  }
});

// TEST TOKEN
router.get("/test-token", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
