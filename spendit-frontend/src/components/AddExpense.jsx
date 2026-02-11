import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // get token from localStorage
      const token = localStorage.getItem("token");

      // POST method
      const response = await api.post(
        "/expenses/create",
        { amount, category, date, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // show success
      setSuccess("Expense added successfully");
      setError("");
      clearForm();
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Failed to add expense");
      } else {
        setError("Server error");
      }
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  //clear form fields
  const clearForm = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="expense-form space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h1 className="text-base/7 font-semibold text-white">
            Add an Expense
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="amount"
                className="block text-sm/6 font-medium text-white"
              >
                Amount
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-white"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="date"
                className="block text-sm/6 font-medium text-white"
              >
                Date
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-white"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        {/*error message */}

        {error && <p className=" expense-error">{error}</p>}
        {success && <p className=" expense-success">{success}</p>}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className=" expense-cancel-button text-sm/6 font-semibold text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="expense-save-button rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpense;
