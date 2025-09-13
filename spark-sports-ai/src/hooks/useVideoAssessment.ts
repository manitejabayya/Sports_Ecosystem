import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { videoAPI } from '@/lib/api';

interface VideoAssessmentState {
  videoFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  analysisResult: any;
  error: string | null;
}

export const useVideoAssessment = () => {
  const [state, setState] = useState<VideoAssessmentState>({
    videoFile: null,
    isUploading: false,
    uploadProgress: 0,
    analysisResult: null,
    error: null,
  });

  const { toast } = useToast();

  const setVideoFile = (file: File | null) => {
    setState(prev => ({
      ...prev,
      videoFile: file,
      error: null,
    }));
  };

  const uploadVideo = async (metadata: Record<string, any> = {}) => {
    if (!state.videoFile) {
      setState(prev => ({
        ...prev,
        error: 'Please select a video file',
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isUploading: true,
      uploadProgress: 0,
      error: null,
    }));

    try {
      const result = await videoAPI.uploadVideo(state.videoFile, {
        ...metadata,
        timestamp: new Date().toISOString(),
      });

      setState(prev => ({
        ...prev,
        analysisResult: result.data,
        uploadProgress: 100,
      }));

      toast({
        title: 'Video Uploaded',
        description: 'Your video has been uploaded and is being analyzed.',
      });

      return result.data;
    } catch (error: any) {
      console.error('Video upload error:', error);
      
      const errorMessage = error.response?.data?.message || 'Failed to upload video. Please try again.';
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));

      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      throw error;
    } finally {
      setState(prev => ({
        ...prev,
        isUploading: false,
      }));
    }
  };

  const reset = () => {
    setState({
      videoFile: null,
      isUploading: false,
      uploadProgress: 0,
      analysisResult: null,
      error: null,
    });
  };

  return {
    ...state,
    setVideoFile,
    uploadVideo,
    reset,
  };
};
