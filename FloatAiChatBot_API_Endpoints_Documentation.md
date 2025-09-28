# FloatAiChatBot - Complete API Endpoints Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Chat & AI Endpoints](#chat--ai-endpoints)
4. [Data & Analytics Endpoints](#data--analytics-endpoints)
5. [User Management Endpoints](#user-management-endpoints)
6. [Admin Endpoints](#admin-endpoints)
7. [Environment Configuration](#environment-configuration)
8. [Implementation Notes](#implementation-notes)
9. [Error Handling](#error-handling)
10. [WebSocket Support](#websocket-support)

---

## Overview

This document outlines all the API endpoints required for the FloatAiChatBot application. The application supports both Firebase authentication and custom backend authentication with JWT tokens.

**Base URL**: `http://localhost:5000` (configurable via `VITE_API_URL`)

**Authentication Methods**:
- Firebase Authentication (Google OAuth)
- Custom Backend Authentication (JWT)

**User Roles**:
- `student` - Student users
- `researcher` - Research users  
- `fisherman` - Fisherman users
- `client` - General client users
- `admin` - Administrative users

---

## Authentication Endpoints

### 1. POST /api/auth/register
**Purpose**: Register new users

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "client"
}
```

**Response**:
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

**Status Codes**:
- `201` - User created successfully
- `400` - Invalid input data
- `409` - Email already exists

---

### 2. POST /api/auth/login
**Purpose**: User login

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
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

**Status Codes**:
- `200` - Login successful
- `401` - Invalid credentials
- `400` - Invalid input data

---

### 3. GET /api/auth/me
**Purpose**: Get current user profile

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "client"
}
```

**Status Codes**:
- `200` - User data retrieved
- `401` - Unauthorized (invalid/missing token)

---

### 4. POST /api/auth/logout
**Purpose**: User logout

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

**Status Codes**:
- `200` - Logout successful
- `401` - Unauthorized

---

### 5. POST /api/auth/refresh
**Purpose**: Refresh JWT token

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "token": "new_jwt_token_here"
}
```

**Status Codes**:
- `200` - Token refreshed
- `401` - Invalid token

---

## Chat & AI Endpoints

### 6. POST /api/chat/message
**Purpose**: Send message to AI chatbot

**Headers**: 
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:
```json
{
  "message": "What's the ocean temperature today?",
  "userId": "user_id",
  "sessionId": "optional_session_id"
}
```

**Response**:
```json
{
  "response": "The current ocean temperature is 22°C...",
  "messageId": "msg_id",
  "timestamp": "2024-01-01T12:00:00Z",
  "data": {
    "type": "text"
  }
}
```

**Response Types**:
- `text` - Simple text response
- `chart` - Chart data response
- `map` - Map visualization response
- `dashboard` - Dashboard data response

**Status Codes**:
- `200` - Message processed successfully
- `400` - Invalid message format
- `401` - Unauthorized
- `429` - Rate limit exceeded

---

### 7. GET /api/chat/history
**Purpose**: Get user's chat history

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `limit` (optional): Number of messages to return (default: 50)
- `offset` (optional): Number of messages to skip (default: 0)
- `sessionId` (optional): Filter by session ID

**Response**:
```json
{
  "messages": [
    {
      "id": "msg_id",
      "type": "user",
      "content": "Hello",
      "timestamp": "2024-01-01T12:00:00Z",
      "sessionId": "session_id"
    },
    {
      "id": "msg_id_2",
      "type": "bot",
      "content": "Hi! How can I help?",
      "timestamp": "2024-01-01T12:00:01Z",
      "sessionId": "session_id"
    }
  ],
  "total": 100,
  "hasMore": true
}
```

**Status Codes**:
- `200` - History retrieved successfully
- `401` - Unauthorized

---

### 8. DELETE /api/chat/history
**Purpose**: Clear user's chat history

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "message": "Chat history cleared successfully"
}
```

**Status Codes**:
- `200` - History cleared successfully
- `401` - Unauthorized

---

## Data & Analytics Endpoints

### 9. GET /api/data/ocean-temp
**Purpose**: Get ocean temperature data

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `location` (optional): `lat,lng` coordinates
- `dateRange` (optional): Time range (e.g., `7d`, `30d`, `1y`)
- `depth` (optional): Ocean depth in meters

**Response**:
```json
{
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "temperature": 22.5,
      "location": {
        "lat": 40.7128,
        "lng": -74.0060
      },
      "depth": 10
    }
  ],
  "chartData": {
    "labels": ["Jan 1", "Jan 2", "Jan 3"],
    "values": [22.5, 23.1, 22.8],
    "chartType": "line",
    "color": "#00bcd4",
    "title": "Ocean Temperature Trend"
  },
  "metadata": {
    "unit": "°C",
    "source": "NOAA",
    "lastUpdated": "2024-01-01T12:00:00Z"
  }
}
```

**Status Codes**:
- `200` - Data retrieved successfully
- `401` - Unauthorized
- `404` - No data found for specified parameters

---

### 10. GET /api/data/salinity
**Purpose**: Get ocean salinity data

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `location` (optional): `lat,lng` coordinates
- `dateRange` (optional): Time range
- `depth` (optional): Ocean depth in meters

**Response**:
```json
{
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "salinity": 35.2,
      "location": {
        "lat": 40.7128,
        "lng": -74.0060
      },
      "depth": 10
    }
  ],
  "chartData": {
    "labels": ["Jan 1", "Jan 2", "Jan 3"],
    "values": [35.2, 35.1, 35.3],
    "chartType": "line",
    "color": "#4caf50",
    "title": "Ocean Salinity Trend"
  },
  "metadata": {
    "unit": "PSU",
    "source": "NOAA",
    "lastUpdated": "2024-01-01T12:00:00Z"
  }
}
```

**Status Codes**:
- `200` - Data retrieved successfully
- `401` - Unauthorized
- `404` - No data found

---

### 11. GET /api/data/sea-level
**Purpose**: Get sea level data

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `location` (optional): `lat,lng` coordinates
- `dateRange` (optional): Time range

**Response**:
```json
{
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "seaLevel": 0.15,
      "location": {
        "lat": 40.7128,
        "lng": -74.0060
      }
    }
  ],
  "chartData": {
    "labels": ["Jan 1", "Jan 2", "Jan 3"],
    "values": [0.15, 0.18, 0.12],
    "chartType": "line",
    "color": "#2196f3",
    "title": "Sea Level Trend"
  },
  "metadata": {
    "unit": "meters",
    "source": "NOAA",
    "lastUpdated": "2024-01-01T12:00:00Z"
  }
}
```

**Status Codes**:
- `200` - Data retrieved successfully
- `401` - Unauthorized
- `404` - No data found

---

### 12. GET /api/data/heat-map
**Purpose**: Get heat map data for ocean visualization

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `dataType` (optional): `temperature`, `salinity`, `sea-level`
- `dateRange` (optional): Time range

**Response**:
```json
{
  "heatData": [
    [0, 0, 0.5],
    [20, 77, 0.8],
    [-10, -50, 0.7],
    [40, 10, 0.6]
  ],
  "bounds": {
    "north": 90,
    "south": -90,
    "east": 180,
    "west": -180
  },
  "metadata": {
    "dataType": "temperature",
    "unit": "°C",
    "lastUpdated": "2024-01-01T12:00:00Z"
  }
}
```

**Status Codes**:
- `200` - Heat map data retrieved
- `401` - Unauthorized

---

## User Management Endpoints

### 13. GET /api/users/profile
**Purpose**: Get user profile details

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "client",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-01T12:00:00Z",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

**Status Codes**:
- `200` - Profile retrieved successfully
- `401` - Unauthorized

---

### 14. PUT /api/users/profile
**Purpose**: Update user profile

**Headers**: 
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "preferences": {
    "theme": "light",
    "notifications": false
  }
}
```

**Response**:
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "client"
  }
}
```

**Status Codes**:
- `200` - Profile updated successfully
- `400` - Invalid input data
- `401` - Unauthorized
- `409` - Email already exists

---

### 15. PUT /api/users/password
**Purpose**: Change user password

**Headers**: 
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Response**:
```json
{
  "message": "Password changed successfully"
}
```

**Status Codes**:
- `200` - Password changed successfully
- `400` - Invalid current password
- `401` - Unauthorized

---

## Admin Endpoints

### 16. GET /api/admin/users
**Purpose**: Get all users (admin only)

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 20)
- `role` (optional): Filter by role
- `search` (optional): Search by name or email

**Response**:
```json
{
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-01-01T12:00:00Z",
      "isActive": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Status Codes**:
- `200` - Users retrieved successfully
- `401` - Unauthorized
- `403` - Forbidden (not admin)

---

### 17. PUT /api/admin/users/:userId/role
**Purpose**: Update user role (admin only)

**Headers**: 
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:
```json
{
  "role": "admin"
}
```

**Response**:
```json
{
  "message": "User role updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

**Status Codes**:
- `200` - Role updated successfully
- `400` - Invalid role
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found

---

### 18. DELETE /api/admin/users/:userId
**Purpose**: Delete user (admin only)

**Headers**: 
```
Authorization: Bearer jwt_token_here
```

**Response**:
```json
{
  "message": "User deleted successfully"
}
```

**Status Codes**:
- `200` - User deleted successfully
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found

---

## Environment Configuration

### Frontend Environment Variables
Create a `.env` file in your project root:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:5000

# Firebase Configuration (if using Firebase auth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend Environment Variables
```env
# Database Configuration
DATABASE_URL=your_database_url
DB_HOST=localhost
DB_PORT=5432
DB_NAME=floatchat
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# AI Service Configuration
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-3.5-turbo

# Data Sources
NOAA_API_KEY=your_noaa_api_key
WEATHER_API_KEY=your_weather_api_key
```

---

## Implementation Notes

### 1. Authentication Flow
- JWT tokens should be stored in `localStorage` on the frontend
- Tokens should include user ID, role, and expiration time
- Implement token refresh mechanism for long-lived sessions
- Support both Firebase and custom authentication

### 2. CORS Configuration
Enable CORS for your frontend domain:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

### 3. Rate Limiting
Implement rate limiting for chat endpoints:
```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### 4. Data Validation
Use proper validation for all input data:
- Email format validation
- Password strength requirements
- Role validation
- Message content sanitization

### 5. Error Handling
Implement consistent error handling across all endpoints.

---

## Error Handling

### Standard Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## WebSocket Support

### Real-time Chat (Optional)
For real-time chat functionality, implement WebSocket endpoint:

**WebSocket Endpoint**: `WS /api/chat/stream`

**Connection**:
```javascript
const ws = new WebSocket('ws://localhost:5000/api/chat/stream?token=jwt_token');
```

**Message Format**:
```json
{
  "type": "message",
  "content": "Hello",
  "sessionId": "session_id"
}
```

**Response Format**:
```json
{
  "type": "response",
  "content": "Hi! How can I help?",
  "messageId": "msg_id",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Security Considerations

### 1. JWT Security
- Use strong, random JWT secrets
- Implement proper token expiration
- Validate token signatures
- Use HTTPS in production

### 2. Input Sanitization
- Sanitize all user inputs
- Validate data types and formats
- Prevent SQL injection
- Prevent XSS attacks

### 3. Rate Limiting
- Implement rate limiting on all endpoints
- Use different limits for different user roles
- Monitor for abuse patterns

### 4. CORS
- Configure CORS properly
- Only allow trusted origins
- Use credentials carefully

### 5. Data Privacy
- Encrypt sensitive data
- Implement proper access controls
- Log access for audit purposes
- Comply with data protection regulations

---

## Testing

### API Testing Checklist
- [ ] Authentication endpoints
- [ ] Chat functionality
- [ ] Data retrieval endpoints
- [ ] User management
- [ ] Admin functions
- [ ] Error handling
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Security headers

### Test Data
Create test users with different roles:
- Admin user
- Client user
- Student user
- Researcher user
- Fisherman user

---

## Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented
- [ ] Security headers configured

---

*This documentation covers all the API endpoints required for the FloatAiChatBot application. Ensure all endpoints are properly implemented and tested before deployment.*
