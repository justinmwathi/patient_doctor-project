import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const user_Id = localStorage.getItem('loggedInUserId'); // Assuming we get the logged-in user's ID from localStorage
  const [user, setUser] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          ` http://localhost:5555/profile/${user_Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('user is:', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, [user_Id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5555/profile/${user_Id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessage('Profile updated successfully');
      setUser(data);
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  if (user) {
    console.log('My user is:', user);
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-details">
        <h2>Details</h2>
        {error && <p className="error">{error}</p>}
        <p>
          <strong>username:</strong> {user.user_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      {!isEditing ? (
        <Link to="#" onClick={() => setIsEditing(true)} className="update-link">
          Update Profile
        </Link>
      ) : (
        <form onSubmit={handleUpdate} className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="user_name"
              value={user.user_name || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
