import React from 'react';

function IncomeList({ incomes }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Income List</h2>
      <ul className="space-y-4">
        {incomes.length > 0 ? (
          incomes.map(income => (
            <li key={income.id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-800">{income.source}</span>
                <span className="text-lg text-gray-600">${income.amount.toFixed(2)}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No income available</p>
        )}
      </ul>
    </div>
  );
}

export default IncomeList;
