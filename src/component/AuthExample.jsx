import React from 'react';
import { useAuth } from '../pages/auth/AuthContext';
import UserProfile from './UserProfile';
import '../styles/UserProfile.css';

const AuthExample = () => {
  const { user, isAuthenticated, authType } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="auth-example">
        <h2>Authentication Example</h2>
        <p>You are not logged in. Please log in to see your profile.</p>
        <a href="/login" className="login-link">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="auth-example">
      <h2>Authentication Example</h2>
      <p>Welcome! You are successfully authenticated.</p>
      
      <div className="auth-info">
        <h3>Authentication Details:</h3>
        <ul>
          <li><strong>Method:</strong> {authType}</li>
          <li><strong>User ID:</strong> {user.uid}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Name:</strong> {user.displayName || 'Not provided'}</li>
          <li><strong>Role:</strong> {user.role || 'Not specified'}</li>
        </ul>
      </div>

      <UserProfile />
    </div>
  );
};

export default AuthExample;
