const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // Save user to database
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    // Check if username & password exist in request
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Wrong password" });

    // Remove password from response
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
