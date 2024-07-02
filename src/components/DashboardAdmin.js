// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin-dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setData(response.data);
    }).catch(error => {
      console.error(error);
      navigate('/');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
<div className="relative min-h-screen">
  <div className="absolute inset-0">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_cCVLefrtVNWx_RTIJPTsOHTYhOsEssLoA&s" alt="Background" className="w-full h-full object-cover opacity-30" />
  </div>
  <div className="relative z-10">
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-10 max-w-3xl w-full mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">{data ? data.message : 'Loading...'}</p>
        <button 
          onClick={handleLogout} 
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</div>



    </>
  );
};

export default AdminDashboard;
