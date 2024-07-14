import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { user_id } = useParams();
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5555/profile/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [user_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5555/profile/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: profile.username,
          email: profile.email,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessage('Profile updated successfully');
      setProfile(data);
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000); // Clear message
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h3>Profile for {profile.username}</h3>
      <div className="profile-info">
        <p>
          <strong>Username: {profile.username}</strong>
        </p>
        <p>
          <strong>Email: {profile.email}</strong>
        </p>
      </div>
      <Link to="#" onClick={() => setIsEditing(true)} className="update-link">
        Update Profile
      </Link>

      {isEditing && (
        <form onSubmit={handleUpdate} className="profile-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
