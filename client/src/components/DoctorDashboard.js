import React, { useState, useEffect } from 'react';
import './Doctors.css';

const DoctorDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5555/registration-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role: 'doctor', specialty }),
      });
      if (response.ok) {
        setRequestSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting registration request:', error);
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>
      {isLoggedIn ? (
        requestSubmitted ? (
          <p>Registration request submitted. Please wait for approval.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Specialty:</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit Registration Request</button>
          </form>
        )
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
