// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Import the firestore object as db
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetsSnapshot = await getDocs(collection(db, 'budgets'));
        const expensesSnapshot = await getDocs(collection(db, 'expenses'));
        const incomeSnapshot = await getDocs(collection(db, 'income'));
        const goalsSnapshot = await getDocs(collection(db, 'goals'));

        const budgetsData = budgetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const expensesData = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const incomeData = incomeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const goalsData = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setBudgets(budgetsData);
        setExpenses(expensesData);
        setIncome(incomeData);
        setGoals(goalsData);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Budgets */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Budgets</h2>
          {budgets.length > 0 ? (
            <ul>
              {budgets.map(budget => (
                <li key={budget.id} className="border-b py-2">
                  <h3 className="font-bold">{budget.title}</h3>
                  <p>{budget.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No budgets available.</p>
          )}
        </section>

        {/* Expenses */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
          {expenses.length > 0 ? (
            <ul>
              {expenses.map(expense => (
                <li key={expense.id} className="border-b py-2">
                  <h3 className="font-bold">{expense.title}</h3>
                  <p>{expense.amount} - {expense.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses available.</p>
          )}
        </section>

        {/* Income */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Income</h2>
          {income.length > 0 ? (
            <ul>
              {income.map(incomeItem => (
                <li key={incomeItem.id} className="border-b py-2">
                  <h3 className="font-bold">{incomeItem.title}</h3>
                  <p>{incomeItem.amount} - {incomeItem.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No income data available.</p>
          )}
        </section>

        {/* Goals */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Goals</h2>
          {goals.length > 0 ? (
            <ul>
              {goals.map(goal => (
                <li key={goal.id} className="border-b py-2">
                  <h3 className="font-bold">{goal.title}</h3>
                  <p>{goal.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No goals available.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
