import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import Navbar from './Navbar';

const AddStudent = () => {
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  const { name, fatherName, hostel, username, phoneNo, password, fee, address, batch } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('/api/add-student', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success(res.data.message); // Display success toast
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error adding student:', err.response.data.message);
      toast.error('Error adding student: ' + err.response.data.message); // Display error toast
    }
  };
  
  return (
    <>
      <Navbar/>
      <div className="add-student-container mt-3 mx-auto max-w-md p-6 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-bold mb-4">Add Student</h1>
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="mb-4">
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="fatherName"
        value={fatherName}
        onChange={onChange}
        placeholder="Father's Name"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="hostel"
        value={hostel}
        onChange={onChange}
        placeholder="Hostel"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="phoneNo"
        value={phoneNo}
        onChange={onChange}
        placeholder="Phone No"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="number"
        name="fee"
        value={fee}
        onChange={onChange}
        placeholder="Fee"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="address"
        value={address}
        onChange={onChange}
        placeholder="Address"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="batch"
        value={batch}
        onChange={onChange}
        placeholder="Batch"
        required
        className="input-field focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add Student
    </button>
  </form>
</div>


    </>
  );
};

export default AddStudent;
