// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard'; // Adjusted import path
import PatientDashboard from './components/PatientDashboard'; // Adjusted import path
import { AppointmentsProvider } from './components/AppointmentsContext'; // Adjusted import path
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
const App = () => {
    return (
    <div>
       <NavBar/>
        <AppointmentsProvider>
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
       <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
       <Route path='/login'element={<Login/>}/>
        <Route path='/patient-dashboard'element={<PatientDashboard/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
       <Route path='/register' element={<Register/>}/>
       </Routes>
       </AppointmentsProvider>
       
    </div>
    );
};

export default App;
