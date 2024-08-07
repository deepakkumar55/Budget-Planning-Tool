import React, { useState } from 'react';
import { addDocument } from '../firebase/firebaseService';

function IncomeForm() {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDocument('income', { source, amount: parseFloat(amount), createdAt: new Date() });
    setSource('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Add Income</h2>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
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
        Add Income
      </button>
    </form>
  );
}

export default IncomeForm;
