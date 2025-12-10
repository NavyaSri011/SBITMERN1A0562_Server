const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Get logged-in user's profile details
router.get("/profile", verifyToken, (req, res) => {
  try {
    // req.user is set in verifyToken -> { id, uname, role }
    const { uname, role } = req.user;

    // Send back user details
    res.status(200).json({
      username: uname,
      role: role,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

module.exports = router;
