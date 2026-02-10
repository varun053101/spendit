const express = require("express");
const app = express();
const PORT = 3000;
const db = require('./database/db')

app.use(express.json())

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
