import React, { useState, useEffect } from 'react';
import GoalForm from '../components/GoalForm';
import { fetchDocuments } from '../firebase/firebaseService';
import GoalTracker from '../components/GoalTracker';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalList = await fetchDocuments('goals');
        setGoals(goalList);
      } catch (err) {
        setError('Failed to load goals. Please try again later.');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Set Financial Goals</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <GoalForm />
        </div>
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg text-center">
              {error}
            </div>
          ) : goals.length > 0 ? (
            <GoalTracker goals={goals} />
          ) : (
            <div className="text-center text-gray-600">No goals added yet. Start by adding your goals.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;
