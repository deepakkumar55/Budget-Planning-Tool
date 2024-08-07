import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { fetchDocuments } from '../firebase/firebaseService';
import ExpenseList from '../components/ExpenseList';

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenseList = await fetchDocuments('expenses');
      setExpenses(expenseList);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Track Expenses</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <ExpenseForm />
        </div>
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
