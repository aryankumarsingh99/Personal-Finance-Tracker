import React from 'react';

const TransactionList = ({ transactions, onEdit, onDelete }) => (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
      <h1 className="font-bold text-2xl mb-4 text-center">Transactions</h1>
      <ul>
        {transactions.slice().reverse().map((tx, idx) => (
          <li key={idx} className="flex items-center justify-between border-b py-3">
            <span className="truncate">
              <span className="font-semibold">{tx.category}</span> | ₹{tx.amount} | {tx.date} {tx.description && `| ${tx.description}`}
            </span>
            <div>
              <button className="mr-2 text-blue-600 font-semibold" onClick={() => onEdit(transactions.length - 1 - idx)}>Edit</button>
              <button className="text-red-600 font-semibold" onClick={() => onDelete(transactions.length - 1 - idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TransactionList;