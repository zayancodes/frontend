import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MonthlyFoodList = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    
    const fetchFoods = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/api/food/monthly/${month}/${year}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setFoods(response.data);
      } catch (error) {
        alert('Error fetching food list');
      }
    };

    fetchFoods();
  }, [month, year]);

  const downloadPDF = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/api/food/download/${month}/${year}`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `FoodList_${month}_${year}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error downloading PDF');
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Food List for {month}/{year}</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          min="1"
          max="12"
          placeholder="Month"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max={new Date().getFullYear()}
          placeholder="Year"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-200 text-left">Name</th>
            <th className="py-2 px-4 border-b bg-gray-200 text-left">Price</th>
            <th className="py-2 px-4 border-b bg-gray-200 text-left">Amount</th>
            <th className="py-2 px-4 border-b bg-gray-200 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td className="py-2 px-4 border-b">{food.name}</td>
              <td className="py-2 px-4 border-b">{`${food.price}`}</td>
              <td className="py-2 px-4 border-b">{`${food.amount} units`}</td>
              <td className="py-2 px-4 border-b">{new Date(food.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={downloadPDF}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default MonthlyFoodList;
