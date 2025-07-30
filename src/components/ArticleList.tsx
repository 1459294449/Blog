'use client';

import React from 'react';
import Link from 'next/link';
import { PostMetadata } from '@/lib/markdown';
import { getAssetPath } from '@/utils/paths';

// 客户端图片组件，处理错误回退
function CoverImage({ post }: { post: PostMetadata }) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white text-2xl font-bold">${post.title.charAt(0)}</span>
            </div>
            <p class="text-white/60 text-sm">文章封面</p>
          </div>
        </div>
      `;
    }
  };

  if (!post.cover) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {post.title.charAt(0)}
            </span>
          </div>
          <p className="text-white/60 text-sm">文章封面</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={getAssetPath(post.cover)}
      alt={`${post.title} 封面`}
      className="absolute inset-0 w-full h-full object-cover"
      onError={handleImageError}
    />
  );
}

interface ArticleListProps {
  posts: PostMetadata[];
  className?: string;
}

export default function ArticleList({ posts, className = '' }: ArticleListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-12 ${className}`}>
      {posts.map((post, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <article 
            key={post.id}
            className={`group glass-card-elegant p-8 animate-card-entrance hover:scale-[1.02] transition-all duration-500`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
              {/* 文章图片 */}
              <div className={`lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Link href={`/posts/${post.id}`}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-orange-400/20 to-pink-400/20 group-hover:scale-105 transition-transform duration-500">
                    <CoverImage post={post} />
                    
                    {/* 悬浮遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>点击阅读</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 文章内容 */}
              <div className={`lg:col-span-3 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* 文章标题 */}
                <Link href={`/posts/${post.id}`}>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 transition-all duration-500 cursor-pointer leading-tight">
                    {post.title}
                  </h2>
                </Link>

                {/* 文章摘要 */}
                {post.excerpt && (
                  <p className="text-white/70 text-lg leading-relaxed line-clamp-3 group-hover:text-white/85 transition-colors duration-300">
                    {post.excerpt}
                  </p>
                )}

                {/* 文章元信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  
                  {post.author && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{post.author}</span>
                    </div>
                  )}
                </div>

                {/* 标签 */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag, tagIndex) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 hover:from-orange-500/20 hover:to-pink-500/20 text-white/80 hover:text-white rounded-full text-xs font-medium transition-all duration-300 border border-white/10 hover:border-orange-400/30 animate-scale-in"
                        style={{ animationDelay: `${(index * 0.1) + (tagIndex * 0.05)}s` }}
                      >
                        #{tag}
                      </Link>
                    ))}
                    {post.tags.length > 4 && (
                      <span className="text-xs text-white/50 px-3 py-1">
                        +{post.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* 阅读按钮 */}
                <div className="pt-4">
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 hover:from-orange-500/30 hover:to-pink-500/30 text-white rounded-full font-medium transition-all duration-500 border border-white/20 hover:border-orange-400/50 group-hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    <span className="mr-2">📖</span>
                    阅读全文
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 装饰性分割线 */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </article>
        );
      })}
    </div>
  );
}

// 简化版文章卡片（用于侧边栏推荐等）
export function SimpleArticleCard({ 
  post, 
  className = '' 
}: { 
  post: PostMetadata; 
  className?: string;
}) {
  return (
    <Link href={`/posts/${post.id}`} className={`block group ${className}`}>
      <div className="glass-card p-4 hover:scale-105 transition-all duration-300">
        <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-orange-200 transition-colors duration-300 mb-2">
          {post.title}
        </h3>
        <p className="text-white/60 text-xs">
          {new Date(post.date).toLocaleDateString('zh-CN')}
        </p>
      </div>
    </Link>
  );
}
