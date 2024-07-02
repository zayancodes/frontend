import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/students', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }); // Adjust the API endpoint as needed
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/students/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }); // Adjust the API endpoint as needed
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-student/${id}`);
  };

  return (
   <>
   <Navbar/>
    <div className="students-list-container mx-auto max-w-4xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Father's Name</th>
            <th className="py-2">Hostel</th>
            <th className="py-2">Username</th>
            <th className="py-2">Phone No</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.fatherName}</td>
              <td className="border px-4 py-2">{student.hostel}</td>
              <td className="border px-4 py-2">{student.username}</td>
              <td className="border px-4 py-2">{student.phoneNo}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdate(student._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

export default StudentsList;
