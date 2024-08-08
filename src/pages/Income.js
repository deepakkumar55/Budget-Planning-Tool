// src/pages/Income.js
import React, { useState, useEffect } from 'react';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import { fetchDocuments } from '../firebase/firebaseService';

const Income = () => {
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const incomeList = await fetchDocuments('income');
        setIncomeRecords(incomeList);
      } catch (err) {
        setError('Failed to load income records. Please try again later.');
        console.error('Error fetching income:', err);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Manage Income</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <IncomeForm />
        </div>
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <IncomeList incomes={incomeRecords} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
