import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'athlete' | 'coach' | 'scout';
  }) => api.post('/auth/register', userData),

  getProfile: () => api.get('/users/me'),
};

// Users API
export const usersAPI = {
  getUsers: (params = {}) => api.get('/users', { params }),
  getUserById: (id: string) => api.get(`/users/${id}`),
  updateProfile: (id: string, userData: any) => 
    api.put(`/users/${id}`, userData),
  uploadProfileImage: (id: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post(`/users/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
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
