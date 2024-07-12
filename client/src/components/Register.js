import React, { useState } from 'react';
import '../styles/Register.css';

function Register() {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user_name') setUser_name(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'role') setRole(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('password', password);
    formData.append('role', role);

    fetch('http://localhost:5555/register', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Registration failed');
          });
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
        setError('');
        // Reset form fields
        setUser_name('');
        setPassword('');
        setRole('patient');
      })
      .catch(error => {
        setError(error.message);
        setMessage('');
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="card register-form">
        <h3>Register</h3>
        <input
          name="user_name"
          placeholder="Username"
          value={user_name}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={role}
          onChange={handleChange}
          required
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
