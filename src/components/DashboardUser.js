import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify'; // Import toast from react-toastify



const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [studentData, setStudentData] = useState('');
  const [studentInvoice, setStudentInvoice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const username = decoded.user.username;
        try {
          const response = await axios.post('/api/user-dashboard', { username }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setData(response.data);
          setStudentData(response.data.data[0]);
          setStudentInvoice(response.data.invoiceData);
        } catch (error) {
          console.error('Failed to send username:', error);
          toast.error('Failed to send username');
          navigate('/');
        }
      }
    };

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/user-dashboard', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setData(response.data);
        } catch (error) {
          console.error('Failed to fetch data:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    handleUser().then(() => {
      fetchData();
    });
  }, [navigate]);

  useEffect(() => {
    console.log('StudentData updated:', studentData);
  }, [studentData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="user-dashboard-container p-5 bg-gray-100 min-h-screen">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <p className="mb-5">{data ? data.message : 'Loading...'}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Name:</p>
          <p>{studentData.name}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Father's Name:</p>
          <p>{studentData.fatherName}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Hostel:</p>
          <p>{studentData.hostel}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Username:</p>
          <p>{studentData.username}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Phone No:</p>
          <p>{studentData.phoneNo}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Password:</p>
          <p>{studentData.password}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Fee:</p>
          <p>{studentData.fee}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <p className="font-semibold">Batch:</p>
          <p>{studentData.batch}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Student Invoices</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentInvoice.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{student.month}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">${student.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      student.isPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {student.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;

