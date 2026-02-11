import { useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditExpense = () => {
  const { state } = useLocation();

  if (!state || !state.expense) {
    return (
      <p className="expense-error">
        No expense data found. Please go back to dashboard.
      </p>
    );
  }

  const { expense } = state;

  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date?.slice(0, 10));
  const [description, setDescription] = useState(expense.description || "");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/expenses/${expense._id}`,
        { amount, category, date, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Expense updated successfully");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update expense");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="expense-form space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h1 className="text-base/7 font-semibold text-white">Edit Expense</h1>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium text-white">
                Amount
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium text-white">
                Category
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium text-white">
                Date
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium text-white">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        {error && <p className="expense-error">{error}</p>}
        {success && <p className="expense-success">{success}</p>}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="expense-cancel-button text-sm/6 font-semibold text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="expense-save-button rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditExpense;
