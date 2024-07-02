import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    fatherName: '',
    hostel: '',
    username: '',
    phoneNo: '',
    password: '',
    fee: '',
    address: '',
    batch: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/api/students/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }); // Adjust the API endpoint as needed
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/students/${id}`, student ,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }); // Adjust the API endpoint as needed
      navigate('/students'); // Redirect to students list after update
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <>

    <Navbar/>
    <div className="update-student-container mx-auto max-w-md p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            placeholder="Father's Name"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="hostel"
            value={student.hostel}
            onChange={handleChange}
            placeholder="Hostel"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={student.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phoneNo"
            value={student.phoneNo}
            onChange={handleChange}
            placeholder="Phone No"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={student.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="fee"
            value={student.fee}
            onChange={handleChange}
            placeholder="Fee"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="batch"
            value={student.batch}
            onChange={handleChange}
            placeholder="Batch"
            required
            className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Student
        </button>
      </form>
    </div></>
  );
};

export default UpdateStudent;
