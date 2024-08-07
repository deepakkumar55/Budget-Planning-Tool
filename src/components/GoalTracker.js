import React from 'react';

function GoalTracker({ goals }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Goals Tracker</h2>
      <ul className="space-y-4">
        {goals.length > 0 ? (
          goals.map(goal => (
            <li key={goal.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-800">{goal.title}</span>
                <span className="text-lg text-gray-600">${goal.targetAmount.toFixed(2)}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No goals available</p>
        )}
      </ul>
    </div>
  );
}

export default GoalTracker;
