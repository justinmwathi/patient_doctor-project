import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrationRequests, setRegistrationRequests] = useState([]);

  useEffect(() => {
    // Implement login status check logic
    const checkLoginStatus = async () => {
      // Check if the admin is logged in (you can use an API call or context)
      const loggedIn = true; // replace with actual login status check
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        // Fetch registration requests
        const response = await fetch('http://localhost:5555/registration-requests');
        const data = await response.json();
        setRegistrationRequests(data);
      }
    };

    checkLoginStatus();
  }, []);

  const handleApprove = async (id) => {
    // Implement approve logic
    const response = await fetch(`http://localhost:5555/registration-requests/${id}/approve`, {
      method: 'POST'
    });
    
    if (response.ok) {
      setRegistrationRequests(prev => prev.filter(request => request.id !== id));
    }
  };

  const handleDelete = async (id) => {
    // Implement delete logic
    const response = await fetch(`http://localhost:5555/registration-requests/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setRegistrationRequests(prev => prev.filter(request => request.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {isLoggedIn ? (
        <>
          <h3>Registration Requests</h3>
          {registrationRequests.length > 0 ? (
            <ul>
              {registrationRequests.map(request => (
                <li key={request.id}>
                  {request.name} ({request.role})
                  <button onClick={() => handleApprove(request.id)}>Approve</button>
                  <button onClick={() => handleDelete(request.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No registration requests.</p>
          )}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;

