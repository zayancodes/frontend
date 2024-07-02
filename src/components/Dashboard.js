// Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
      
        if (decoded.user && decoded.user.isAdmin !== undefined) {
          if (decoded.user.isAdmin) {
            console.log('Navigating to Admin Dashboard'); // Debugging line
            navigate('/admin-dashboard', { replace: true });
          } else {
            console.log('Navigating to User Dashboard'); // Debugging line
            navigate('/user-dashboard', { replace: true });
          }
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <p>Loading...</p>;
};

export default Dashboard;
