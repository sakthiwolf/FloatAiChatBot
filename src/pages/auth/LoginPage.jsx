import React, { useState, useEffect } from "react";
import { googleProvider } from "../../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("client");
  const [authMethod] = useState("backend"); // 'backend' or 'firebase' - hidden from UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    loginWithBackend, 
    registerWithBackend, 
    loginWithFirebase, 
    error, 
    clearError,
    isAuthenticated 
  } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when switching between auth methods or forms
  useEffect(() => {
    clearError();
  }, [authMethod, isRegister, clearError]);

  // Google Auth
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      console.log('Starting Google login process...');
      await loginWithFirebase(googleProvider);
      console.log('Google login successful, navigating to chat...');
      navigate("/chat");
    } catch (error) {
      console.error("Google login error:", error);
      // Error is already handled in AuthContext, just log it here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Backend Email/Password Auth
  const handleBackendAuth = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isRegister) {
        await registerWithBackend({
          name,
          email,
          password,
          role
        });
      } else {
        await loginWithBackend({
          email,
          password
        });
      }
      navigate("/chat");
    } catch (error) {
      console.error("Backend auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{isRegister ? "Register" : "Login"}</h2>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span>{error}</span>
            <button type="button" onClick={clearError} className="error-close">
              ×
            </button>
          </div>
        )}

        {/* Backend Authentication Form */}
        <form onSubmit={handleBackendAuth} className="login-form">
          {isRegister && (
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <div className="role-selection">
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >
                <option value="student">Student</option>
                <option value="researcher">Researcher</option>
                <option value="fisherman">Fisherman</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : (isRegister ? "Register" : "Login")}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="btn-google"
          disabled={isSubmitting}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            className="google-icon"
          />
          {isSubmitting ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="toggle-text">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
