import React, { useState } from 'react';
import axios from 'axios';

const AddExpenses = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/expense/add', { name, price,  date },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Expense added successfully');
    } catch (error) {
      alert('Error adding Expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg mb-6">
    <h2 className="text-2xl font-bold mb-4">Add Other Expenses</h2>
    <div className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="p-2 border rounded w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
        className="p-2 border rounded w-full"
      />
    </div>

    <div className="mb-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="p-2 border rounded w-full"
      />
    </div>
    <button
      type="submit"
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Add Expense
    </button>
  </form>
  );
};

export default AddExpenses;
