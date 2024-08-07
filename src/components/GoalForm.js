import React, { useState } from 'react';
import { addDocument } from '../firebase/firebaseService';

function GoalForm() {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim() || isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setError('Please provide a valid title and target amount greater than 0.');
      return;
    }

    try {
      await addDocument('goals', {
        title,
        targetAmount: parseFloat(targetAmount),
        createdAt: new Date(),
      });
      setTitle('');
      setTargetAmount('');
      setError(''); // Clear error if successful
    } catch (error) {
      setError('Failed to add goal. Please try again.');
      console.error('Error adding document:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Add Goal</h2>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full"
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full"
        step="0.01"
        min="0"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Add Goal
      </button>
    </form>
  );
}

export default GoalForm;
