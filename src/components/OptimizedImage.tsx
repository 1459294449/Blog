'use client';

import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'lazy' | 'eager';
}

/**
 * 优化的图片组件
 * 用于替代 <img> 标签，提供更好的性能和用户体验
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  onError,
  loading = 'lazy'
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onError}
      loading={loading}
      decoding="async"
      // 添加性能优化属性
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
    />
  );
}
