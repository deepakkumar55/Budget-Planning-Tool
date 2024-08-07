import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Expenses List</h2>
      <ul className="space-y-4">
        {expenses.length > 0 ? (
          expenses.map(expense => (
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
    </div>
  );
}

export default ExpenseList;
