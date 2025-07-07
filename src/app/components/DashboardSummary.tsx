import React from 'react';

const DashboardSummary = ({ transactions }) => {
  const total = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  const byCategory = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});
  const recent = transactions.slice(-5).reverse();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-9 mb-6">
      <div className="bg-orange-200 rounded-lg p-4 shadow text-center">
        <div className="text-lg font-bold">Total Expenses</div>
        <div className="text-2xl font-extrabold text-orange-600">₹{total.toFixed(2)}</div>
      </div>
      <div className="bg-blue-200 rounded-lg p-4 shadow">
        <div className="text-lg font-bold mb-2 text-center">Category Breakdown</div>
        <ul>
          {Object.entries(byCategory).map(([cat, amt]) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span>₹{amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-green-200 rounded-lg p-4 shadow">
        <div className="text-lg font-bold mb-2 text-center">Recent Transactions</div>
        <ul>
          {recent.map((tx, idx) => (
            <li key={idx} className="text-sm border-b py-1">
              <span className="font-semibold">{tx.category}</span> | ₹{tx.amount} | {tx.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSummary;