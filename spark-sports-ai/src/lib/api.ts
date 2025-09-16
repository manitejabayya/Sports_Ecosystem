import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'https://sports-ecosystem.onrender.com/api';

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Function to set the auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize auth token from localStorage if it exists
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Flag to prevent multiple token refresh requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (!config.headers) {
      config.headers = {} as any;
    }
    if (token) {
      // Set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug log outgoing request
    try {
      const url = (config.baseURL || '') + (config.url || '');
      const hasAuth = Boolean((config.headers as any).Authorization);
      const authPreview = hasAuth ? String((config.headers as any).Authorization).slice(0, 20) + '...' : 'none';
      console.log('API Request:', { method: config.method, url, hasAuth, authPreview });
    } catch {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // If error is not a 401 or it's a login/refresh request, reject
    if (error.response?.status !== 401 || originalRequest._retry || 
        originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    // If we're already refreshing the token, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
      .then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    }

    // Set the retry flag and start refresh process
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Try to refresh the token
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
      const { token } = response.data;
      
      // Update the token in localStorage
      localStorage.setItem('token', token);
      
      // Update the Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      originalRequest.headers.Authorization = `Bearer ${token}`;
      
      // Process any queued requests
      processQueue(null, token);
      
      // Retry the original request
      return api(originalRequest);
    } catch (refreshError) {
      // If refresh fails, clear the token and redirect to login
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      processQueue(refreshError, null);
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, data } = response.data;
      if (token) {
        setAuthToken(token);
      }
      return { ...response, data: { ...response.data, user: data || response.data.user } };
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'athlete' | 'coach' | 'scout';
  }) => api.post('/auth/register', userData),

  // Backend exposes current user at /api/auth/me
  getProfile: async (config: AxiosRequestConfig = {}) => {
    try {
      const response = await api.get('/auth/me', config);
      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Clear auth data on 401
        setAuthToken(null);
      }
      throw error;
    }
  },
};

// Users API
export const usersAPI = {
  // Note: backend doesn't expose generic /users list in current routes; keep for future
  getUsers: (params = {}) => api.get('/users', { params }),

  // Get user by ID
  getUserById: (userId: string) => api.get(`/users/${userId}`),

  // Current logged-in user's profile
  getMyProfile: () => api.get('/users/profile'),

  // Update current user's profile
  updateProfile: (userData: any) => 
    api.put('/users/profile', userData),

  // Upload profile image
  uploadProfileImage: (formData: FormData) => 
    api.put('/users/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  // Performance and Analytics
  getPerformanceAnalytics: () => api.get('/users/analytics'),
  
  // Training Sessions
  addTrainingSession: (sessionData: any) => api.post('/users/training-session', sessionData),
  
  // Goals Management
  addGoal: (goalData: any) => api.post('/users/goals', goalData),
  updateGoal: (goalId: string, goalData: any) => api.put(`/users/goals/${goalId}`, goalData),

  // Dashboards
  getAthleteDashboard: () => api.get('/users/athlete-dashboard'),
  getCoachDashboard: () => api.get('/users/coach-dashboard'),
};

// Video Assessment API
export const videoAPI = {
  uploadVideo: (videoFile: File, metadata: any) => {
    const formData = new FormData();
    formData.append('video', videoFile);
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    return api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getVideoAnalytics: (videoId: string) => 
    api.get(`/videos/${videoId}/analytics`),
};

// Community API
export const communityAPI = {
  getPosts: (params = {}) => api.get('/community/posts', { params }),
  createPost: (postData: any) => api.post('/community/posts', postData),
  likePost: (postId: string) => api.post(`/community/posts/${postId}/like`),
  commentOnPost: (postId: string, content: string) => 
    api.post(`/community/posts/${postId}/comments`, { content }),
};

export default api;
