import React, { useState } from 'react';
import { addDocument } from '../firebase/firebaseService';

function IncomeForm() {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!source.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please provide a valid source and amount greater than 0.');
      return;
    }

    try {
      await addDocument('income', { source, amount: parseFloat(amount), createdAt: new Date() });
      setSource('');
      setAmount('');
      setError(''); // Clear error if successful
    } catch (error) {
      setError('Failed to add income. Please try again.');
      console.error('Error adding document:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Add Income</h2>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

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
        step="0.01"
        min="0"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Add Income
      </button>
    </form>
  );
}

export default IncomeForm;
