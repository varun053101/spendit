const express = require("express");
const router = express.Router();

// Create an expense
router.post("/create", (req, res) => {
  res.send("Create expense");
});

// Get all the expenses
router.get("/", (req, res) => {
  res.send("Get all expenses");
});

// Get a single expense
router.get("/:id", (req, res) => {
  res.send("Get expense by ID");
});

// Update an expense
router.put("/:id", (req, res) => {
  res.send("Update expense");
});

// Delete an expense
router.delete("/:id", (req, res) => {
  res.send("Delete expense");
});

module.exports = router;