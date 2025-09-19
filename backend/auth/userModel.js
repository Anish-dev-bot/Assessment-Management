// Simple in-memory user storage
const bcrypt = require("bcrypt");

const users = []; // [{ username, passwordHash }]

async function createUser(username, password) {
  const existing = users.find(u => u.username === username);
  if (existing) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);
  const user = { username, passwordHash: hash };
  users.push(user);
  return user;
}

async function authenticateUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
}

module.exports = { createUser, authenticateUser, users };
