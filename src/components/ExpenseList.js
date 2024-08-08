import React, { useState, useEffect } from 'react';
import { fetchDocuments } from '../firebase/firebaseService';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError('');
      try {
        const expenseList = await fetchDocuments('expenses');
        setExpenses(expenseList);
      } catch (err) {
        setError('Failed to fetch expenses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Expenses List</h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-gray-800">{expense.description}</span>
                  <span className="text-lg text-gray-600">${expense.amount.toFixed(2)}</span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No expenses available</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
