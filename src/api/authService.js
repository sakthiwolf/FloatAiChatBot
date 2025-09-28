// API service for backend authentication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  // Set token in localStorage and instance
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get token from localStorage
  getToken() {
    return this.token || localStorage.getItem('authToken');
  }

  // Make authenticated API requests
  async makeRequest(endpoint, options = {}) {
    const token = this.getToken();
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData) {
    const response = await this.makeRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // Login user
  async login(credentials) {
    const response = await this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // Get current user profile
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await this.makeRequest('/api/auth/me');
  }

  // Logout user
  async logout() {
    try {
      await this.makeRequest('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.setToken(null);
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Refresh token (if your backend supports it)
  async refreshToken() {
    const response = await this.makeRequest('/api/auth/refresh', {
      method: 'POST',
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }
}

// Create and export a singleton instance
export const authService = new AuthService();
export default authService;
