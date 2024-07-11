// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import { AppointmentsProvider } from './components/AppointmentsContext';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';

// Logout component
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call to backend logout
      const response = await fetch('http://your-backend-url/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

// Modified NavBar component to include Logout
const NavBarWithLogout = () => {
  return (
    <div>
      <NavBar />
      <Logout />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <NavBarWithLogout />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/patient-dashboard' element={<PatientDashboard/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
};

export default App;