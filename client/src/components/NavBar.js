import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import '../styles/Nav.css';

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('loggedInUserId'); // Get user ID

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserId');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="logo">
        <FontAwesomeIcon icon={faHouseMedical} size="lg" />
        <h1>MediCare+</h1>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <NavLink to={`/profile/${loggedInUserId}`}>Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
