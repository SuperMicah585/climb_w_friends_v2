export interface UploadResult {
  data: any;
  error: any;
}

export class StorageService {
  private apiBaseUrl = import.meta.env.VITE_DOMAIN || 'http://localhost:8080/';

  /**
   * Upload an image file through the backend API
   */
  async uploadImage(file: File): Promise<UploadResult> {
    try {
      console.log('StorageService: Starting upload');
      console.log('StorageService: File size:', file.size);
      
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload through backend API
      const response = await fetch(`${this.apiBaseUrl}api/Maps/upload-image`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('StorageService: Upload error:', errorData);
        return { data: null, error: errorData };
      }
      
      const result = await response.json();
      console.log('StorageService: Upload result:', result);
      return { data: { imageUrl: result.imageUrl, fileName: result.fileName }, error: null };
    } catch (error) {
      console.error('StorageService: Upload error:', error);
      return { data: null, error };
    }
  }

  /**
   * Generate a unique filename
   */
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

  /**
   * Validate file type
   */
  validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate file size (max 10MB)
   */
  validateFileSize(file: File): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB
    return file.size <= maxSize;
  }
}

export const storageService = new StorageService(); 