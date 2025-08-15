import { useState } from 'react';
import { storageService } from '../services/storageService';
import type { UploadResult } from '../services/storageService';

export interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<UploadResult>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<UploadResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate file type
      if (!storageService.validateFileType(file)) {
        const errorMsg = 'Invalid file type. Only JPG, PNG, GIF, and WebP files are allowed.';
        setError(errorMsg);
        return { data: null, error: { message: errorMsg } };
      }

      // Validate file size
      if (!storageService.validateFileSize(file)) {
        const errorMsg = 'File size too large. Maximum size is 10MB.';
        setError(errorMsg);
        return { data: null, error: { message: errorMsg } };
      }

      const result = await storageService.uploadImage(file);
      
      if (result.error) {
        setError(result.error.message || 'Failed to upload image');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    uploadImage,
    isLoading,
    error,
    clearError
  };
}; 