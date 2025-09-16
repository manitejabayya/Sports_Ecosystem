import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'scout';
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (
    name: string,
    email: string,
    password: string,
    role: 'athlete' | 'coach' | 'scout',
    profileData?: any
  ) => Promise<User | null>;
  logout: () => void;
  loadUser: (token?: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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
  const loadUser = useCallback(async (token?: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // If a token is provided, update the auth header
      if (token) {
        localStorage.setItem('token', token);
      }
      
      const activeToken = localStorage.getItem('token');
      if (!activeToken) {
        console.log('No token found in localStorage');
        throw new Error('No authentication token found');
      }
      
      console.log('Loading user with token...');
      
      // Make the request to get user profile
      console.log('Making request to /auth/me');
      const response = await authAPI.getProfile();
      
      console.log('Received response from /auth/me:', response.status, response.statusText);
      
      // Handle different response formats
      const responseData = response.data;
      const apiUser = responseData?.data || responseData?.user || responseData;
      
      if (!apiUser) {
        console.error('Invalid user data received:', response);
        throw new Error('Invalid user data received from server');
      }

      console.log('User loaded successfully:', { 
        id: apiUser._id, 
        email: apiUser.email,
        role: apiUser.role 
      });
      
      setUser(apiUser);
      setIsAuthenticated(true);
      return apiUser;
    } catch (err: any) {
      const errorStatus = err?.response?.status;
      const errorData = err?.response?.data;
      
      console.error('Error loading user:', {
        status: errorStatus,
        message: err.message,
        response: errorData,
        url: err?.config?.url
      });
      
      // If we get a 401, clear the token and redirect to login
      if (errorStatus === 401) {
        console.log('Authentication failed, redirecting to login');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login', { 
          state: { 
            from: location.pathname,
            error: 'Your session has expired. Please log in again.'
          } 
        });
      }
      
      // Re-throw the error with a more descriptive message
      const errorMessage = errorData?.message || err.message || 'Failed to load user profile';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [navigate, location]);

  // Login user
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting login with email:', email);
      
      // Clear any existing token and reset auth state
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      
      // Make the login request
      const response = await authAPI.login(email, password);
      console.log('Login response:', response);
      
      // Get user data from response
      const responseData = response.data;
      const apiUser = responseData?.data?.user || responseData?.user || responseData?.data;
      
      if (!apiUser) {
        console.error('No user data in response:', responseData);
        throw new Error('No user data received from server');
      }
      
      console.log('Login successful, loading user profile...');
      
      try {
        // Load the user profile
        const userProfile = await loadUser();
        
        if (!userProfile) {
          throw new Error('Failed to load user profile');
        }
        
        console.log('User profile loaded successfully:', userProfile);
        
        // Show success message
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        
        // Redirect to the intended URL or based on user role
        const from = location.state?.from?.pathname || 
                    (userProfile?.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard');
        
        console.log('Redirecting to:', from);
        navigate(from, { replace: true });
        
        return userProfile;
      } catch (profileError) {
        console.error('Error loading user profile after login:', profileError);
        throw new Error('Login successful but failed to load user profile');
      }
    } catch (err: any) {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });
      
      // Clear any partial auth state
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Login failed. Please check your credentials and try again.';
      
      setError(errorMessage);
      
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: errorMessage,
      });
      
      // Re-throw with a more specific error
      const error = new Error(errorMessage);
      (error as any).cause = err; // Store the original error as a property
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'athlete' | 'coach' | 'scout',
    profileData: any = {}
  ): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Combine all registration data
      const registrationData = {
        name,
        email,
        password,
        role,
        ...profileData // Spread all profile data into the main object
      };
      
      const response = await authAPI.register(registrationData);
      // Backend returns { success, token, data: { ...user } }
      const token = (response as any).data?.token;
      const apiUser = (response as any).data?.data;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      setUser(apiUser);
      setIsAuthenticated(true);
      
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created successfully.',
      });
      
      // Redirect based on role
      const redirectPath = (apiUser?.role || role) === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
      navigate(redirectPath, { replace: true });
      return apiUser;
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: errorMessage,
      });
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
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
