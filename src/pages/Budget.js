import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/BudgetForm';
import { fetchDocuments } from '../firebase/firebaseService';

function Budget() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgetList = await fetchDocuments('budgets');
      setBudgets(budgetList);
    };

    fetchBudgets();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Budget Management</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <BudgetForm />
        </div>
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Existing Budgets</h2>
          <ul className="space-y-4">
            {budgets.length > 0 ? (
              budgets.map(budget => (
                <li key={budget.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-medium text-gray-800">{budget.category}</span>
                    <span className="text-lg text-gray-600">${budget.amount.toFixed(2)}</span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-600">No budgets available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Budget;
