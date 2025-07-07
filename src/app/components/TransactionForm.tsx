'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'
];

const TransactionForm = ({ onSubmit, initialTransaction }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTransaction) {
      setAmount(initialTransaction.amount);
      setDate(initialTransaction.date);
      setCategory(initialTransaction.category || CATEGORIES[0]);
      setDescription(initialTransaction.description || '');
    } else {
      setAmount('');
      setDate('');
      setCategory(CATEGORIES[0]);
      setDescription('');
    }
  }, [initialTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !category) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit({ amount: parseFloat(amount), date, category, description });
    setAmount('');
    setDate('');
    setCategory(CATEGORIES[0]);
    setDescription('');
  };

  return (
    <Card className="w-full max-w-md mb-6">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="₹ Enter the amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Optional note"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <Button type="submit" className="w-full bg-blue-700 ">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;