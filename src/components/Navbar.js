import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-2xl">
        Hostel Management
      </div>
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/admin-dashboard" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">Home</Link>
        <Link to="/food" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">Food</Link>
        <Link to="/expense" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">Expenses</Link>
        <Link to="/invoices" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">Invoice</Link>
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300 focus:outline-none inline-flex items-center"
          >
            Students
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <li>
                <Link to="/add-student" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Student</Link>
              </li>
              <li>
                <Link to="/students" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Update Students</Link>
              </li>
              <li>
                <Link to="/invoices/download" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Students Invoice</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <li>
              <Link to="/admin-dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/food" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Food</Link>
            </li>
            <li>
              <Link to="/expense" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Expenses</Link>
            </li>
            <li>
              <Link to="/invoices" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Invoice</Link>
            </li>
            <li>
              <Link to="/add-student" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Student</Link>
            </li>
            <li>
              <Link to="/students" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Update Students</Link>
            </li>
            <li>
              <Link to="/invoices/download" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Students Invoice</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
