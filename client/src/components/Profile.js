import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  // const { userId } = useParams(); // Use this if you're using React Router with URL params
  const user_Id = localStorage.getItem('loggedInUserId'); // Assuming we get the logged-in user's ID from localStorage
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5555/profile/${user_Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5555/appointments/profile/${user_Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments');
      }
    };

    fetchUserDetails();
    fetchAppointments();
  }, [user_Id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5555/users/${user_Id}`, {
        method: 'PUT',
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

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-details">
        <h2>Details</h2>
        {error && <p className="error">{error}</p>}
        <p>
          <strong>Name:</strong> {user.username}
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
              name="name"
              value={user.username || ''}
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
      {message && <p className="message">{message}</p>}
      <div className="appointment-history">
        <h2>Appointment History</h2>
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment">
            <h3>Appointment with {appointment.doctor.name}</h3>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
            <div className="prescriptions">
              <h4>Prescriptions:</h4>
              {appointment.prescriptions.map((prescription) => (
                <div key={prescription.id} className="prescription">
                  <p>
                    <strong>Medicine:</strong> {prescription.medicine}
                  </p>
                  <p>
                    <strong>Dosage:</strong> {prescription.dosage}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {prescription.instructions}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
