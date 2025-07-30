'use client';

import React from 'react';
import { profileConfig, getAvatarPath, getFallbackLetter } from '@/config/profile';
import { getAssetPath } from '@/utils/paths';
import OptimizedImage from './OptimizedImage';

export default function HeaderAvatar() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 如果头像加载失败，显示默认的字母
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.className = "w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300";
      parent.innerHTML = `<span class="text-white text-lg font-bold">${getFallbackLetter()}</span>`;
    }
  };

  return (
    <OptimizedImage
      src={getAssetPath(getAvatarPath())}
      alt={`${profileConfig.name} Avatar`}
      className="w-full h-full object-cover"
      onError={handleImageError}
      loading="eager"
    />
  );
}
