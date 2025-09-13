import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { usersAPI } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface ProfileContextType {
  profile: any;
  loading: boolean;
  error: string | null;
  updateProfile: (data: any) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated || !user?._id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await usersAPI.getUserById(user._id);
      setProfile(response.data);
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user?._id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: any) => {
    if (!user?._id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await usersAPI.updateProfile(user._id, data);
      setProfile(response.data);
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    if (!user?._id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await usersAPI.uploadProfileImage(user._id, file);
      setProfile(response.data);
      
      toast({
        title: 'Profile Image Updated',
        description: 'Your profile image has been updated successfully.',
      });
    } catch (err: any) {
      console.error('Error uploading profile image:', err);
      setError(err.response?.data?.message || 'Failed to upload profile image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        uploadProfileImage,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
