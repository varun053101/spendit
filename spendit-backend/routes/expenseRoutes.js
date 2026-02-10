const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const User = require("../models/User");
const { jwtAuthMiddleware } = require("../auth/jwt");
const mongoose = require("mongoose");

// Create an expense
router.post("/create", jwtAuthMiddleware, async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const userId = req.user.id;

    if (!amount || !category || !date) {
      return res.status(400).json({
        error: "all the fields are required",
      });
    }

    const expense = new Expense({
      amount,
      category,
      date,
      description,
      userId,
    });

    const savedExpense = await expense.save();

    return res.status(201).json({
      message: "Expense created successfully",
      expense: savedExpense,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get all the expenses of the user
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Expense.find({ userId: userId });

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific expense
router.get("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(expenseId)) {
      return res.status(400).json({ error: "Invalid expense ID" });
    }

    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    const data = {
      amount: expense.amount,
      category: expense.category,
      date: expense.date.toLocaleDateString(),
      description: expense.description,
    };

    console.log("retrieved");
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update an expense
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(expenseId)) {
      return res.status(400).json({ error: "Invalid expense ID" });
    }

    const { amount, category, date, description } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (category !== undefined) updateData.category = category;
    if (date !== undefined) updateData.date = date;
    if (description !== undefined) updateData.description = description;

    // Prevent empty update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "Nothing to update",
      });
    }

    // update only if expense belongs to user
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId },
      updateData,
      { returnDocument: "after" },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an expense
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(expenseId)) {
      return res.status(400).json({ error: "Invalid expense ID" });
    }

    // delete only if expense belongs to user
    const deletedExpense = await Expense.findOneAndDelete(
      { _id: expenseId, userId }
    );

    if (!deletedExpense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense Deleted",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;