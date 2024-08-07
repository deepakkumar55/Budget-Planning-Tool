import React, { useState } from 'react';
import { addDocument } from '../firebase/firebaseService';
import { useAuth } from '../hooks/useAuth';

function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      await addDocument('budgets', {
        category,
        amount: parseFloat(amount),
        createdAt: new Date(),
        userId: user.uid,
      });
      setCategory('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Add Budget</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full"
        required
      />
      <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
        Add Budget
      </button>
    </form>
  );
}

export default BudgetForm;
