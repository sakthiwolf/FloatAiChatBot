# Authentication Setup Guide

This project includes a comprehensive authentication system with two options:

## 1. Firebase Authentication
- Google OAuth login
- Automatic user management
- No backend required

## 2. Backend API Authentication
- JWT-based authentication
- Custom user registration/login
- Role-based access control

## Backend API Endpoints Required

Your backend should implement these endpoints:

### POST /api/auth/register
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "client"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

### POST /api/auth/login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client"
  }
}
```

### GET /api/auth/me
**Headers:** `Authorization: Bearer jwt_token_here`

**Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "client"
}
```

### POST /api/auth/logout
**Headers:** `Authorization: Bearer jwt_token_here`

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Environment Configuration

Create a `.env` file in your project root:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:5000
```

## Available User Roles

- `student` - Student users
- `researcher` - Research users
- `fisherman` - Fisherman users
- `client` - General client users
- `admin` - Administrative users

## Usage Examples

### Using Protected Routes with Role-based Access

```jsx
import ProtectedRoute from './routes/ProtectedRoute';

// Protect route for any authenticated user
<ProtectedRoute>
  <ChatPage />
</ProtectedRoute>

// Protect route for admin users only
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

### Using Authentication Context

```jsx
import { useAuth } from './pages/auth/AuthContext';

const MyComponent = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <p>Your role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Features

- ✅ Dual authentication methods (Firebase + Backend API)
- ✅ JWT token storage in localStorage
- ✅ Automatic token refresh and user profile fetching
- ✅ Role-based access control
- ✅ Loading states and error handling
- ✅ Protected routes with role checking
- ✅ User profile display
- ✅ Universal logout functionality

## Security Notes

- JWT tokens are stored in localStorage
- Tokens are automatically included in API requests
- Invalid tokens are automatically cleared
- All authentication errors are properly handled
- Role-based access is enforced on protected routes
