import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideoAssessment from "./pages/VideoAssessment";
import AthleteDashboard from "./pages/AthleteDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create a theme instance with custom properties
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

// Create a wrapper component that ensures only supported props are passed to MUI
const ThemeProvider = ({ children }: any) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

// Auth Check Component - Handles initial auth state check
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, loadUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && !isAuthenticated) {
          await loadUser();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [isAuthenticated, loadUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'athlete' | 'coach' | 'scout' }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required, check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to dashboard based on user role
    const redirectTo = user?.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (for login/register when already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    const from = location.state?.from?.pathname || 
                (location.pathname === '/login' || location.pathname === '/register' ? 
                 '/dashboard' : location.pathname);
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <AuthCheck>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<Index />} />

        {/* Protected Routes */}
        <Route path="/athlete-dashboard" element={
          <ProtectedRoute requiredRole="athlete">
            <AthleteDashboard />
          </ProtectedRoute>
        } />
        <Route path="/coach-dashboard" element={
          <ProtectedRoute requiredRole="coach">
            <CoachDashboard />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/video-assessment" element={
          <ProtectedRoute>
            <VideoAssessment />
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthCheck>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <ProfileProvider>
              <TooltipProvider>
                <AppRoutes />
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </ProfileProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;