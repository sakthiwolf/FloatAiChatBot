# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

FloatAiChatBot is a React-based ocean data visualization and AI chatbot application that provides interactive charts, maps, and data analysis for ocean-related information (temperature, salinity, sea levels). The application features dual authentication (Firebase OAuth and custom backend JWT), role-based access control, and real-time data visualization capabilities.

## Common Development Commands

### Development Server
- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

### Environment Setup
- Create `.env` file with:
  - `VITE_API_URL` - Backend API URL (defaults to http://127.0.0.1:8001)
  - Firebase config variables (VITE_FIREBASE_*)

## Architecture Overview

### Dual Authentication System
The application supports two authentication methods that work independently:

1. **Firebase Authentication**: Google OAuth with automatic user management
2. **Backend API Authentication**: JWT-based with role management (student, researcher, fisherman, client, admin)

**Key Files:**
- `src/pages/auth/AuthContext.jsx` - Unified auth context managing both systems
- `src/api/authService.js` - Backend API service with JWT token management
- `src/firebase/firebaseConfig.js` - Firebase configuration
- `src/routes/ProtectedRoute.jsx` - Route protection with role checking

### Component Architecture

**Layout System:**
- `src/layouts/MainLayout.jsx` - Main application wrapper
- `src/component/Navbar.jsx` - Navigation with auth state
- `src/component/Footer.jsx` - Footer component

**Chat System:**
- `src/pages/client/ChatPage.jsx` - Main chat interface
- `src/component/chatbot/ChatBox.jsx` - Message display with chart/map rendering
- `src/component/chatbot/ChatInput.jsx` - Message input handling
- `src/component/chatbot/Sidebar.jsx` - Chat sidebar navigation

**Data Visualization:**
- `src/component/chatbot/ChartCard.jsx` - Chart.js integration for data visualization
- `src/component/chatbot/MapCard.jsx` - Leaflet.js maps with heatmap support

### Routing Structure
```
/ (MainLayout)
├── / (LandingPage)
├── /login (LoginPage)
├── /about (AboutPage)
└── /chat (ChatPage) - Protected Route
```

### State Management
- React Context for authentication (`AuthContext`)
- Local state management with React hooks
- localStorage for JWT token persistence

## API Integration

The frontend expects a comprehensive backend API with the following endpoint categories:
- Authentication: `/api/auth/*`
- Chat/AI: `/api/chat/*`
- Ocean Data: `/api/data/*` (temperature, salinity, sea-level, heat-map)
- User Management: `/api/users/*`
- Admin Functions: `/api/admin/*`

**API Response Formats:**
- Chat responses support multiple types: text, chart, map, dashboard
- Chart data includes labels, values, chartType, color, and title
- Map data includes heatmap coordinates and metadata

## Technology Stack

**Core:**
- React 19.1.1 with Vite 7.1.7
- React Router DOM 7.9.1 for routing
- ES Modules with modern JavaScript

**Authentication:**
- Firebase 12.3.0 (Google OAuth)
- Custom JWT implementation

**Data Visualization:**
- Chart.js 4.5.0 with react-chartjs-2 5.3.0
- Leaflet 1.9.4 with react-leaflet 5.0.0 and leaflet.heat 0.2.0

**UI/UX:**
- CSS Modules for component styling
- React Toastify 11.0.5 for notifications

## Development Guidelines

### File Organization
- Components in `src/component/` with nested folders for related functionality
- Pages in `src/pages/` organized by user type (auth, client)
- Styles in `src/styles/` using CSS modules
- API services in `src/api/`
- Layouts in `src/layouts/`

### Authentication Flow
1. Check for existing JWT token on app initialization
2. Fetch user data from backend if JWT exists
3. Fall back to Firebase authentication if no backend token
4. Store user state in AuthContext with authType indicator
5. Protect routes based on authentication status and user roles

### Component Pattern
- Functional components with hooks
- Props destructuring in component parameters
- CSS modules for styling with consistent naming
- Error boundaries for robust error handling

### Chart Integration
When adding new chart types:
1. Ensure backend API returns data in the expected format with `chartData` object
2. Chart data should include: labels, values, chartType, color, title
3. Use Chart.js configuration with responsive design and dark theme colors

### Map Integration
For map-based visualizations:
1. Use Leaflet with OpenStreetMap tiles
2. Implement heatmap layers for data visualization
3. Support dynamic data loading based on user queries

## Testing Strategy

### Key Areas to Test
- Authentication flows (both Firebase and backend)
- Protected route access with different user roles
- Chart rendering with various data types
- Map functionality with heatmap data
- API service error handling
- Token management and refresh

### Testing Commands
No specific test runners configured. Recommend adding:
- Jest for unit testing
- React Testing Library for component tests
- Cypress or Playwright for E2E testing

## Configuration Files

- `vite.config.js` - Vite bundler configuration with React plugin
- `eslint.config.js` - ESLint configuration with React rules and globals
- `package.json` - Dependencies and scripts

## Common Issues and Solutions

### Authentication Problems
- Verify Firebase configuration in `.env`
- Check backend API URL and CORS settings
- Ensure JWT tokens are properly stored and retrieved
- Validate user roles match backend expectations

### Build Issues
- Use Node.js compatible version with Vite 7.x
- Ensure all dependencies are properly installed
- Check for proper import/export syntax in ES modules

### Map Rendering
- Ensure Leaflet CSS is imported in components using maps
- Verify heatmap data format: `[lat, lng, intensity]` arrays
- Check for proper map container sizing

## Backend API Requirements

The application expects a fully functional backend API supporting:
- JWT authentication with role-based access control  
- Ocean data endpoints returning Chart.js compatible formats
- Real-time or WebSocket support for chat functionality
- CORS configuration for frontend domain
- Rate limiting and security headers

Refer to `FloatAiChatBot_API_Endpoints_Documentation.md` and `AUTHENTICATION_SETUP.md` for detailed API specifications.