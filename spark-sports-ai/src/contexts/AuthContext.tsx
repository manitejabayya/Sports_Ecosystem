import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'scout';
  avatar?: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'athlete' | 'coach' | 'scout';
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load user from token on initial load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await loadUser();
        } catch (err) {
          console.error('Failed to load user', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Load user data
  const loadUser = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error loading user', err);
      throw err;
    }
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      
      // Redirect based on user role
      const redirectPath = user.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'athlete' | 'coach' | 'scout';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      
      // Redirect based on user role
      const redirectPath = user.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      loading,
      error,
      login, 
      register,
      logout,
      loadUser
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
