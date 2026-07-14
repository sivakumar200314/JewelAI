const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
try {
const { name, email, password } = req.body;


const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "Email already registered",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({
  name,
  email,
  password: hashedPassword,
});

await user.save();

res.status(201).json({
  message: "User Registered Successfully",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
});

// Login
router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    message: "Invalid Email or Password",
  });
}

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid Email or Password",
  });
}

const token = jwt.sign(
  { id: user._id },
  "jewelai_secret_key",
  { expiresIn: "7d" }
);

res.status(200).json({
  token,
  name: user.name,
  email: user.email,
  message: "Login Successful",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
});

module.exports = router;
