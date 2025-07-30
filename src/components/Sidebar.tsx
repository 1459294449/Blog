'use client';

import React from 'react';
import Link from 'next/link';
import { PostMetadata } from '@/lib/markdown';
import SearchBox from './SearchBox';
import { getImagePath } from '@/utils/paths';
import { profileConfig, getAvatarPath, getFallbackLetter } from '@/config/profile';

interface SidebarProps {
  posts: PostMetadata[];
  className?: string;
}

export default function Sidebar({ posts, className = '' }: SidebarProps) {

  // 获取推荐文章（最新的3篇）
  const recommendedPosts = posts.slice(0, 3);

  // 获取标签统计
  const tagStats = posts.reduce((acc, post) => {
    post.tags?.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 网站信息卡片 */}
      <div className="glass-card p-6 text-center animate-fade-in">
        {/* 头像 */}
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white/20">
          <img
            src={getAvatarPath()}
            alt={`${profileConfig.name} 头像`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果头像加载失败，显示默认的字母头像
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center animate-pulse-glow"><span class="text-white text-3xl font-bold">${getFallbackLetter()}</span></div>`;
              }
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{profileConfig.name}</h3>
        <p className="text-white/70 text-sm mb-4">{profileConfig.title}</p>
        
        {/* 统计信息 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{posts.length}</div>
            <div className="text-xs text-white/60">文章</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{topTags.length}</div>
            <div className="text-xs text-white/60">标签</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">∞</div>
            <div className="text-xs text-white/60">访问</div>
          </div>
        </div>

        <Link
          href="/about"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 hover:from-orange-500/30 hover:to-pink-500/30 text-white rounded-full text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
        >
          <span className="mr-2">⭐</span>
          了解更多
        </Link>
      </div>

      {/* 搜索框 */}
      <div className="glass-card p-4 animate-fade-in-delay">
        <h4 className="text-lg font-bold text-orange-400 mb-3 flex items-center">
          <span className="mr-2">🔍</span>
          搜索
        </h4>
        <SearchBox posts={posts} />
      </div>

      {/* 推荐文章 */}
      {recommendedPosts.length > 0 && (
        <div className="glass-card p-4 animate-fade-in-delay">
          <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
            <span className="mr-2">🔥</span>
            推荐文章
          </h4>
          <div className="space-y-3">
            {recommendedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block group"
              >
                <div className="flex space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white text-xs font-bold">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white text-sm font-medium line-clamp-2 group-hover:text-orange-200 transition-colors duration-300">
                      {post.title}
                    </h5>
                    <p className="text-white/60 text-xs mt-1">
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 热门标签 */}
      {topTags.length > 0 && (
        <div className="glass-card p-4 animate-fade-in-delay">
          <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
            <span className="mr-2">🏷️</span>
            热门标签
          </h4>
          <div className="flex flex-wrap gap-2">
            {topTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full text-xs font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                #{tag}
                <span className="ml-1 text-white/60">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 快速导航 */}
      <div className="glass-card p-4 animate-fade-in-delay">
        <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
          <span className="mr-2">🚀</span>
          快速导航
        </h4>
        <div className="space-y-2">
          <Link
            href="/posts"
            className="flex items-center p-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="mr-3">📚</span>
            文章分类
          </Link>
          <Link
            href="/about"
            className="flex items-center p-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="mr-3">👨‍💻</span>
            关于我
          </Link>
          <a
            href="mailto:your-email@example.com"
            className="flex items-center p-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="mr-3">📧</span>
            联系我
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="mr-3">🐙</span>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
