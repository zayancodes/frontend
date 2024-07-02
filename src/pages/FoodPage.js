import React from 'react';
import AddFood from '../components/AddFood';
import MonthlyFoodList from '../components/MonthlyFoodList';
import Navbar from '../components/Navbar';

const FoodPage = () => {
  return (
    <>
       <Navbar/>
    <div className="max-w-4xl mx-auto p-6">
         
      <h1 className="text-3xl font-bold mb-6">Food Management</h1>
      <AddFood />
      <MonthlyFoodList />
    </div>
    </>
    
  );
};

export default FoodPage;
