'use client';

import React from 'react';
import { profileConfig, getAvatarPath, getFallbackLetter } from '@/config/profile';
import OptimizedImage from './OptimizedImage';

export default function AboutAvatar() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 如果头像加载失败，显示默认样式
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="w-32 h-32 rounded-full mx-auto bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center border-4 border-orange-200 dark:border-orange-800 shadow-lg"><span class="text-white text-4xl font-bold">${getFallbackLetter()}</span></div>`;
    }
  };

  return (
    <OptimizedImage
      src={getAvatarPath()}
      alt={`${profileConfig.name} Avatar`}
      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-200 dark:border-orange-800 shadow-lg"
      onError={handleImageError}
      loading="eager"
    />
  );
}
