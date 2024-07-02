import React from 'react';
import AddExpenses from '../components/AddExpenses';
import MonthlyExpensesList from '../components/MonthlyExpensesList';
import Navbar from '../components/Navbar';

const ExpensesPage = () => {
  return (
    <>
            <Navbar/>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Other Expenses</h1>
      <AddExpenses/>
      <MonthlyExpensesList/>
    </div>
    </>
  );
};

export default ExpensesPage;
