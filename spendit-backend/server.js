require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./database/db')
const cors = require('cors');

app.use(express.json())

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
  credentials: true
}));

const userRoutes = require("./routes/userRoutes")
const expenseRoutes = require("./routes/expenseRoutes")

app.use('/user', userRoutes)
app.use('/expenses', expenseRoutes)

app.get("/health", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});