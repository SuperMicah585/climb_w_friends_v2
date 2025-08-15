import React, { useRef, useState } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImageUrl?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUploaded, 
  currentImageUrl, 
  className = "" 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isLoading, error, clearError } = useImageUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    const result = await uploadImage(file);
    if (result.data && !result.error) {
      onImageUploaded(result.data.imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const file = files[0];
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    const result = await uploadImage(file);
    if (result.data && !result.error) {
      onImageUploaded(result.data.imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${className}`}>
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={clearError}
            className="text-red-500 hover:text-red-700 text-xs mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-600 text-sm">Uploading image...</p>
        </div>
      )}

      {/* Image Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          border-2 border-dashed border-gray-300 rounded-lg p-6 text-center 
          hover:border-gray-400 transition-colors cursor-pointer
          ${previewUrl ? 'bg-gray-50' : 'bg-white'}
        `}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg mx-auto"
            />
            <p className="text-gray-600 text-sm">Click to change image</p>
          </div>
        ) : (
          <div>
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-gray-600">Drag and drop an image here</p>
            <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, GIF, WebP up to 10MB</p>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload; 