import React from 'react';
import { useAuth } from '../pages/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user, logout, authType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="profile-avatar"
          />
        )}
        <div className="user-details">
          <h3>{user.displayName || 'User'}</h3>
          <p className="user-email">{user.email}</p>
          {user.role && (
            <p className="user-role">
              Role: <span className="role-badge">{user.role}</span>
            </p>
          )}
          <p className="auth-type">
            Auth: <span className="auth-badge">{authType}</span>
          </p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
