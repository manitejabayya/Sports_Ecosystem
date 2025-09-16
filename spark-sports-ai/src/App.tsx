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

const queryClient = new QueryClient();

// Create a theme instance
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

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'athlete' | 'coach' | 'scout' }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Redirect to login with the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectTo = user?.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (for login/register when already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
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
        
        <Route path="/video-assessment" element={<VideoAssessment />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

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