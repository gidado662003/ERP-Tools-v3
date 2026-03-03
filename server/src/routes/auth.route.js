const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ user: req.user });
});

module.exports = route;
