import React, { useState, useEffect } from 'react';
import { fetchDocuments } from '../firebase/firebaseService';

function Summary() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetList, expenseList, incomeList, goalList] = await Promise.all([
          fetchDocuments('budgets'),
          fetchDocuments('expenses'),
          fetchDocuments('income'),
          fetchDocuments('goals')
        ]);
        setBudgets(budgetList);
        setExpenses(expenseList);
        setIncome(incomeList);
        setGoals(goalList);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  const totalBudgets = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncome = income.reduce((acc, incomeItem) => acc + incomeItem.amount, 0);
  const totalGoals = goals.reduce((acc, goal) => acc + goal.targetAmount, 0);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
          <h3 className="text-lg font-medium text-green-700">Total Budgets</h3>
          <p className="text-xl font-bold text-green-800">${totalBudgets.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
          <h3 className="text-lg font-medium text-red-700">Total Expenses</h3>
          <p className="text-xl font-bold text-red-800">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <h3 className="text-lg font-medium text-blue-700">Total Income</h3>
          <p className="text-xl font-bold text-blue-800">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-700">Total Goals</h3>
          <p className="text-xl font-bold text-yellow-800">${totalGoals.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
