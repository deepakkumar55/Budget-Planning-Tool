import React, { useState } from 'react';
import { addDocument } from '../firebase/firebaseService';

function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDocument('expenses', { description, amount: parseFloat(amount), createdAt: new Date() });
      setDescription('');
      setAmount('');
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Add Expense</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
      <button
        type="submit"
        className={`w-full p-3 rounded-lg shadow transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;
