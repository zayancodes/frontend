// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './tailwind.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/DashboardAdmin';
import UserDashboard from './components/DashboardUser';
import AddStudent from './components/AddStudent';
import PrivateRoute from './components/PrivateRoute';
import FoodPage from './pages/FoodPage';
import ExpensesPage from './pages/ExpensesPage';
import InvoicePage from './pages/InvoicePage';
import StudentsList from './components/StudentList';
import UpdateStudent from './components/UpdateStudent';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/food" element={<PrivateRoute><FoodPage /></PrivateRoute>} />
          <Route path="/expense" element={<PrivateRoute><ExpensesPage /></PrivateRoute>} />
          <Route path="/invoices" element={<PrivateRoute><InvoicePage /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute><StudentsList /></PrivateRoute>} />
          <Route path="/update-student/:id" element={<PrivateRoute>< UpdateStudent/></PrivateRoute>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
