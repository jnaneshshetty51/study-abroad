'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export default function ImageWithFallback({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  fallback = '/placeholder.jpg',
  objectFit = 'cover',
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use placeholder images from Unsplash or similar
  const getPlaceholder = (type: 'university' | 'country' | 'blog' | 'user' = 'university') => {
    const placeholders: Record<string, string> = {
      university: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=${width}&h=${height}&fit=crop`,
      country: `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=${width}&h=${height}&fit=crop`,
      blog: `https://images.unsplash.com/photo-1503676260728-1c00e0947c63?w=${width}&h=${height}&fit=crop`,
      user: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=${width}&h=${height}&fit=crop`,
    };
    return placeholders[type] || placeholders.university;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getPlaceholder());
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const objectFitClass = 
    objectFit === 'cover' ? 'object-cover' :
    objectFit === 'contain' ? 'object-contain' :
    objectFit === 'fill' ? 'object-fill' :
    objectFit === 'none' ? 'object-none' :
    'object-scale-down';

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10" />
      )}
      {hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-300 ${objectFitClass} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-300 ${objectFitClass} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          unoptimized={imgSrc.includes('unsplash.com')}
        />
      )}
    </div>
  );
}

