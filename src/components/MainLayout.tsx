'use client';

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export default function MainLayout({ 
  children, 
  sidebar,
  className = '' 
}: MainLayoutProps) {
  return (
    <div className={`main-content-area ${className}`}>
      {/* 主内容容器 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          {sidebar && (
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {sidebar}
              </div>
            </div>
          )}
          
          {/* 主内容区域 */}
          <div className={`${sidebar ? 'lg:col-span-3' : 'lg:col-span-4'} order-1 lg:order-2`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// 专门的首页布局组件
export function HomeLayout({ 
  children, 
  sidebar,
  className = '' 
}: MainLayoutProps) {
  return (
    <div className={`main-content-area bg-transparent ${className}`}>
      {/* 主内容容器 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          {sidebar && (
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {sidebar}
              </div>
            </div>
          )}
          
          {/* 主内容区域 */}
          <div className={`${sidebar ? 'lg:col-span-3' : 'lg:col-span-4'} order-1 lg:order-2`}>
            {/* 公告栏 */}
            <div className="glass-card p-4 mb-8 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="text-orange-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-white/90 text-sm">
                  <span className="font-medium">欢迎来到我的博客！</span>
                  <span className="ml-2">这里记录着我的技术成长之路</span>
                </div>
              </div>
            </div>

            {/* 分类标题 */}
            <div className="mb-8 animate-fade-in-delay">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-orange-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">发现</h2>
              </div>
            </div>

            {/* 主内容 */}
            <div className="space-y-8">
              {children}
            </div>

            {/* 分页或加载更多 */}
            <div className="text-center mt-12 animate-fade-in">
              <div className="glass-card inline-block px-6 py-3 cursor-pointer hover:scale-105 transition-transform duration-300">
                <span className="text-white/80 text-sm">~~到底啦~~</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
