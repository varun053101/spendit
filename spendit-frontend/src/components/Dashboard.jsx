import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import api from "../api/axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(response.data);
      } catch (err) {
        console.log("Failed to fetch expenses");
      }
    };

    fetchExpenses();
  }, []);

  const handleDeleteFromUI = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense._id !== id));
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );

  if (expenses.length === 0) {
    return (
      <>
        <h1 className="head-text">DASHBOARD</h1>
        <p className="empty-expense">there are no expenses</p>
      </>
    );
  }

  return (
    <>
      <h1 className="head-text">DASHBOARD</h1>

      <div className="total-expense-card">
        <h2 className="total-expense-tag">Total Expenses</h2>
        <p className="total-expense">₹ {totalExpenses}</p>
      </div>

      {expenses.map((expense, index) => (
        <ExpenseList
          key={expense._id || index}
          expense={expense}
          onDelete={handleDeleteFromUI}
        />
      ))}
    </>
  );
};

export default Dashboard;
