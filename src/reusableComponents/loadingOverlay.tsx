import React from 'react';
import LoadingSpinner from './loadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'gray';
  overlay?: boolean;
  transparency?: 'none' | 'light' | 'medium' | 'heavy';
  className?: string;
  children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text,
  size = 'medium',
  color = 'white',
  overlay = true,
  transparency = 'none',
  className = '',
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  const transparencyClasses = {
    none: 'bg-transparent',
    light: 'bg-white bg-opacity-25',
    medium: 'bg-white bg-opacity-50',
    heavy: 'bg-white bg-opacity-75',
  };

  if (overlay) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <div className={`absolute inset-0 ${transparencyClasses[transparency]} flex items-center justify-center z-50`}>
          <LoadingSpinner size={size} color={color} text={text} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LoadingSpinner size={size} color={color} text={text} />
    </div>
  );
};

export default LoadingOverlay; 