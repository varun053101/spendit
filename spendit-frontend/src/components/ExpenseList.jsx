import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const ExpenseList = ({ expense, onDelete }) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/expenses/${expense._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(expense._id);
    } catch (err) {
      console.error("Failed to delete expense");
    }
  };

  return (
    <div className="expense-card">
      <p>
        <strong>Amount: </strong>
        {expense.amount}
      </p>

      <p>
        <strong>Category: </strong>
        {expense.category}
      </p>

      <p>
        <strong>Date: </strong>
        {new Date(expense.date).toLocaleDateString("en-GB")}
      </p>

      <p>
        <strong>Description: </strong>
        <span
          className="desc-plus relative cursor-pointer"
          onClick={() => setShowDesc(!showDesc)}
        >
          view
          {showDesc && (
            <div
              className="
                desc-popup
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                bg-gray-900 text-white text-sm
                rounded-md shadow-lg p-2 w-48 z-20
              "
            >
              {expense.description}
            </div>
          )}
        </span>
      </p>

      {/* EDIT */}
      <button className="edit-button">
        <Link
          to="/edit-expense"
          state={{ expense }}
          className="editbutton font-semibold text-indigo-400 hover:text-indigo-300"
        >
          edit
        </Link>
      </button>

      {/* DELETE */}
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseList;
