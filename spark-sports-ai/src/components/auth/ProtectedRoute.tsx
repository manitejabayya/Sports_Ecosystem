import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

type ProtectedRouteProps = {
  roles?: ('athlete' | 'coach' | 'scout')[];
};

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    // Redirect to unauthorized or dashboard based on user role
    const redirectPath = user.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
