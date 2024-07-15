import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('password', password);

    fetch('http://localhost:5555/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'Login failed');
          });
        }
        return response.json();
      })
      .then((userData) => {
        // Log token for debugging
        console.log('Token:', userData.access_token);
        console.log(userData);

        // Handle successful login
        setError('');
        setSuccess('Login successful!'); // Set success message

        // Store token in localStorage
        localStorage.setItem('token', userData.access_token);

        // Store user ID and user name if needed
        localStorage.setItem('loggedInUserId', userData.user_Id);
        localStorage.setItem('userName', userData.user_name);

        // Redirect based on user role
        setTimeout(() => { // Delay navigation to show success message
          if (userData.role === 'patient') {
            navigate('/patient-dashboard');
          } else if (userData.role === 'doctor') {
            navigate('/doctor-dashboard');
          } else if (userData.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            setError('Invalid role received from server');
          }
        }, 1000); // Adjust delay time as needed
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(''); // Clear success message on error
        console.error('Login error:', error);
      });
  };

  const handleChangeUserName = (e) => {
    setUser_name(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="card login-form">
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={user_name}
          onChange={handleChangeUserName}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
      </form>
    </div>
  );
}

export default Login;

