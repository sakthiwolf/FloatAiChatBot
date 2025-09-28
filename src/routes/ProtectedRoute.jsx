import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/AuthContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if required
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Required role: {requiredRole}</p>
        <p>Your role: {user.role || 'Not specified'}</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
