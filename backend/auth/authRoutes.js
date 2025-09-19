const express = require("express");
const jwt = require("jsonwebtoken");
const { createUser, authenticateUser } = require("./userModel");

const router = express.Router();
const SECRET = "supersecret"; // ⚠️ use env var in production

// Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await createUser(username, password);
    res.json({ success: true, message: "User created" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authenticateUser(username, password);
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { router, authMiddleware };
