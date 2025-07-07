'use client';
import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import DashboardSummary from './components/DashboardSummary';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleAddOrEdit = (tx) => {
    if (editingIdx !== null) {
      const updated = [...transactions];
      updated[editingIdx] = tx;
      setTransactions(updated);
      setEditingIdx(null);
    } else {
      setTransactions([...transactions, tx]);
    }
  };

  const handleEdit = (idx) => setEditingIdx(idx);

  const handleDelete = (idx) => {
    setTransactions(transactions.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-4 overflow-auto">
      <h1 className="text-5xl font-extrabold text-white -600 mb-4 mt-6">Personal Finance Tracker</h1>
      <DashboardSummary transactions={transactions} />
      <TransactionForm
        onSubmit={handleAddOrEdit}
        initialTransaction={editingIdx !== null ? transactions[editingIdx] : null}
      />
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MonthlyExpensesChart transactions={transactions} />
    </main>
  );
}
