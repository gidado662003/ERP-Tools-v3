const express = require("express");
const {
  getAllusers,
  getUserById,
  isAuthenticated,
  signup,
  login,
} = require("./users.controller");

const route = express.Router();

// Sync user profile with Laravel token (protected by Sanctum middleware)
route.post("/signup", signup);
route.post("/login", login);

// Protected routes (authentication required)
route.get("/", getAllusers);
route.get("/:id", getUserById);

route.get("/is-authenticated", isAuthenticated);

module.exports = route;
