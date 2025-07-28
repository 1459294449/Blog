'use client';

import React, { useState, useEffect } from 'react';
import { getImagePath } from '@/utils/paths';

interface BackgroundImageProps {
  theme?: 'auto' | 'light' | 'dark';
  className?: string;
  imageUrl?: string;
  fallbackGradient?: boolean;
}

export default function BackgroundImage({
  theme = 'auto',
  className = '',
  imageUrl = getImagePath('bg3.jpg'),
  fallbackGradient = true
}: BackgroundImageProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 监听主题切换事件
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail;
      if (newTheme === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setCurrentTheme(newTheme);
      }
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);

    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'auto';
    if (savedTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        window.removeEventListener('themeChange', handleThemeChange as EventListener);
      };
    } else {
      setCurrentTheme(savedTheme as 'light' | 'dark');
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, [theme]);

  return (
    <div className={`poetize-background ${className}`}>
      {/* 主背景图片 */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundAttachment: 'fixed'
          }}
        />
      )}

      {/* 渐变背景（作为备选或叠加） */}
      {(fallbackGradient || !imageUrl) && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${imageUrl ? 'opacity-20' : 'opacity-100'}`}
          style={{
            background: currentTheme === 'dark'
              ? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 20s ease infinite'
          }}
        />
      )}

      {/* 图片遮罩层（提高文字可读性） */}
      {imageUrl && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: currentTheme === 'dark'
            ? 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.1) 100%)'
          }}
        />
      )}

      {/* 次级渐变层 */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-1000"
        style={{
          background: currentTheme === 'dark'
            ? 'radial-gradient(ellipse at top, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 119, 198, 0.2) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 182, 193, 0.2) 0%, transparent 50%)',
          animation: 'gradient-shift 25s ease infinite reverse'
        }}
      />

      {/* 装饰性网格 */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* 动态光效 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主光束 */}
        <div
          className="absolute top-0 left-1/4 w-1 h-full opacity-20 animate-wave"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-1 h-full opacity-15 animate-wave"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,182,193,0.5), transparent)',
            animationDelay: '2s'
          }}
        />

        {/* 浮动光球 */}
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-15 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(255,182,193,0.4) 0%, transparent 70%)',
            animationDelay: '3s'
          }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full opacity-25 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
            animationDelay: '5s'
          }}
        />

        {/* 星光效果 */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-white rounded-full opacity-60 animate-wave" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full opacity-80 animate-wave" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-70 animate-wave" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-wave" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 顶部渐变遮罩 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: currentTheme === 'dark'
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.05) 100%)'
        }}
      />
    </div>
  );
}

// 浮动动画关键帧（如果globals.css中没有的话）
const floatingStyles = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-15px) translateX(-8px); }
  }
  
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-25px) translateX(15px); }
  }
  
  .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
  .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
`;

// 如果需要，可以动态注入样式
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = floatingStyles;
  document.head.appendChild(styleElement);
}
