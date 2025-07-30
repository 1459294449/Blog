'use client';

import React, { useState, useEffect } from 'react';

type ArticleTheme = 'original' | 'pure-white' | 'pure-black';

export default function ArticleThemeToggle() {
  const [theme, setTheme] = useState<ArticleTheme>('original');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('article-theme') as ArticleTheme || 'original';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: ArticleTheme) => {
    const root = document.documentElement;
    
    // 移除所有文章主题类
    root.classList.remove('article-theme-original', 'article-theme-pure-white', 'article-theme-pure-black');
    
    // 添加对应的主题类
    root.classList.add(`article-theme-${selectedTheme}`);
  };

  const toggleTheme = () => {
    const themes: ArticleTheme[] = ['original', 'pure-white', 'pure-black'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    localStorage.setItem('article-theme', nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'pure-white':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'pure-black':
        return (
          <svg className="w-5 h-5" fill="currentColor" stroke="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case 'original':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
          </svg>
        );
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'pure-white':
        return '纯白背景';
      case 'pure-black':
        return '纯黑背景';
      case 'original':
        return '原始主题';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="article-theme-toggle glass-card p-3 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
}

// 简化版本的主题切换按钮
export function ArticleThemeToggleCompact() {
  const [theme, setTheme] = useState<ArticleTheme>('original');

  useEffect(() => {
    const savedTheme = localStorage.getItem('article-theme') as ArticleTheme || 'original';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const themes: ArticleTheme[] = ['original', 'pure-white', 'pure-black'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    localStorage.setItem('article-theme', nextTheme);
    
    const root = document.documentElement;
    root.classList.remove('article-theme-original', 'article-theme-pure-white', 'article-theme-pure-black');
    root.classList.add(`article-theme-${nextTheme}`);
  };

  const getDisplayText = () => {
    switch (theme) {
      case 'pure-white':
        return '白';
      case 'pure-black':
        return '黑';
      case 'original':
        return '原';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20"
      title={`切换到${theme === 'original' ? '纯白' : theme === 'pure-white' ? '纯黑' : '原始'}主题`}
    >
      {getDisplayText()}
    </button>
  );
}
