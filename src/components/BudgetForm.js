import React, { useState, useEffect } from 'react';
import { addDocument, deleteDocument, updateDocument, fetchDocuments } from '../firebase/firebaseService';
import { useAuth } from '../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';

function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [editId, setEditId] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      try {
        const budgetList = await fetchDocuments('budgets');
        setBudgets(budgetList);
      } catch (err) {
        setError('Failed to fetch budgets');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      setLoading(true);
      try {
        if (editId) {
          await updateDocument('budgets', editId, { category, amount: parseFloat(amount) });
        } else {
          await addDocument('budgets', {
            category,
            amount: parseFloat(amount),
            createdAt: new Date(),
            userId: user.uid,
          });
        }

        setCategory('');
        setAmount('');
        setEditId(null);
        const budgetList = await fetchDocuments('budgets');
        setBudgets(budgetList);
      } catch (err) {
        setError('Failed to save budget');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (budget) => {
    setCategory(budget.category);
    setAmount(budget.amount.toString());
    setEditId(budget.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setLoading(true);
      try {
        await deleteDocument('budgets', id);
        setBudgets(budgets.filter((budget) => budget.id !== id));
      } catch (err) {
        setError('Failed to delete budget');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">{editId ? 'Edit Budget' : 'Add Budget'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          {editId ? 'Update Budget' : 'Add Budget'}
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {budgets.map((budget) => (
            <li key={budget.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg flex justify-between items-center">
              <span>
                <strong>{budget.category}</strong>: ${budget.amount.toFixed(2)}
              </span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(budget)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(budget.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BudgetForm;
