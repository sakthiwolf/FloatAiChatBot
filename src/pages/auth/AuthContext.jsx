import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { authService } from "../../api/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authType, setAuthType] = useState(null); // 'firebase' or 'backend'

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check for backend JWT token first
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUser({
            uid: userData.id,
            email: userData.email,
            displayName: userData.name,
            role: userData.role,
            authType: 'backend'
          });
          setAuthType('backend');
          setLoading(false);
          return;
        } catch (error) {
          console.error('Failed to fetch user from backend:', error);
          // Clear invalid token
          authService.setToken(null);
        }
      }

      // If no backend auth, check Firebase
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            authType: 'firebase'
          });
          setAuthType('firebase');
        } else {
          setUser(null);
          setAuthType(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Backend authentication methods
  const loginWithBackend = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      const userData = await authService.getCurrentUser();
      
      setUser({
        uid: userData.id,
        email: userData.email,
        displayName: userData.name,
        role: userData.role,
        authType: 'backend'
      });
      setAuthType('backend');
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithBackend = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      const currentUser = await authService.getCurrentUser();
      
      setUser({
        uid: currentUser.id,
        email: currentUser.email,
        displayName: currentUser.name,
        role: currentUser.role,
        authType: 'backend'
      });
      setAuthType('backend');
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Firebase authentication methods
  const loginWithFirebase = async (provider) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Attempting Firebase Google login...');
      const result = await signInWithPopup(auth, provider);
      console.log('Firebase login successful:', result.user);
      
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        authType: 'firebase'
      });
      setAuthType('firebase');
      return result;
    } catch (error) {
      console.error('Firebase login error:', error);
      let errorMessage = error.message;
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login was cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by your browser. Please allow popups and try again.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized for Google sign-in. Please contact support.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in is not enabled. Please contact support.';
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Universal logout
  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      if (authType === 'backend') {
        await authService.logout();
      } else if (authType === 'firebase') {
        await signOut(auth);
      }
      
      setUser(null);
      setAuthType(null);
    } catch (error) {
      setError(error.message);
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    authType,
    loginWithBackend,
    registerWithBackend,
    loginWithFirebase,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
