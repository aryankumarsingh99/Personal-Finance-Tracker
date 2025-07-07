import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

function groupByMonth(transactions) {
  const map = {};
  transactions.forEach(tx => {
    const month = tx.date.slice(0, 7); // YYYY-MM
    map[month] = (map[month] || 0) + Number(tx.amount);
  });
  return Object.entries(map).map(([month, total]) => ({ month, total }));
}

function groupByCategory(transactions) {
  const map = {};
  transactions.forEach(tx => {
    const cat = tx.category || 'Other';
    map[cat] = (map[cat] || 0) + Number(tx.amount);
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

const COLORS = ['#f59e42', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c'];

const MonthlyExpensesChart = ({ transactions }) => {
  const data = groupByMonth(transactions);
  const pieData = groupByCategory(transactions);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-28 mt-6">
      <div className="h-[350px] bg-orange-100 rounded-xl shadow-lg p-4">
        <h2 className="font-bold text-lg mb-2">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#f59e42" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[350px] bg-orange-100 rounded-xl shadow-lg p-4">
        <h2 className="font-bold text-lg mb-2">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;