import React, { useState, useEffect } from 'react';
//import DoctorProfileUpdate from './DoctorProfileUpdate';
//import AppointmentRequests from './AppointmentRequests';
import './Doctors.css';

const DoctorDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5555/session', {
          method: 'GET',
          credentials: 'include', // Include credentials for CORS
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>
      {isLoggedIn ? (
        <>
        {  /*<DoctorProfileUpdate />
          <AppointmentRequests /> */}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;

