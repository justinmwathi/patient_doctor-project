import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import Profile from './components/Profile';
import ProfileLayout from './components/ProfileLayout'; // Import ProfileLayout

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path=":user_id" element={<Profile />} />
          <Route path=":user_id/update" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
