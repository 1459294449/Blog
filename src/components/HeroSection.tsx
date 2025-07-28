'use client';

import React from 'react';
import TypeWriter from './TypeWriter';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  typewriterTexts?: string[];
  className?: string;
}

export default function HeroSection({
  title = "MarkChin 的个人博客",
  subtitle = "探索世界的无限风景",
  typewriterTexts = [
    "探索技术的无限可能",
    "分享编程的点点滴滴",
    "记录成长的每一步",
    "创造属于自己的世界"
  ],
  className = ''
}: HeroSectionProps) {

  const scrollToContent = () => {
    const contentElement = document.querySelector('.main-content-area');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative h-screen w-full overflow-hidden flex items-center justify-center ${className}`}>
      {/* 主内容区域 */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 网站标题 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in">
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block text-white drop-shadow-2xl hover:text-pink-200 transition-colors duration-300 animate-bounce-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* 副标题 */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-8 animate-fade-in-delay">
          <span className="drop-shadow-lg">
            {subtitle}
          </span>
        </p>

        {/* 打字机效果 */}
        <div className="mb-12 animate-fade-in-delay">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium">
            <TypeWriter
              texts={typewriterTexts}
              speed={120}
              deleteSpeed={80}
              pauseTime={2000}
              className="text-pink-200"
            />
          </h3>
        </div>

        {/* 装饰性波浪 */}
        <div className="relative mb-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-2 w-24 h-1 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* 向下箭头 */}
        <div className="animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300" onClick={scrollToContent}>
          <svg
            className="w-8 h-8 text-white/70 hover:text-white mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
