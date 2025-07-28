'use client';

import React, { useState, useEffect } from 'react';
import { PostMetadata } from '@/lib/markdown';
import Link from 'next/link';

interface SearchBoxProps {
  posts: PostMetadata[];
  className?: string;
}

export default function SearchBox({ posts, className = '' }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    setResults(searchResults);
    setIsOpen(true);
  }, [query, posts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="glass-card p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章..."
            value={query}
            onChange={handleInputChange}
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none text-lg"
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 搜索结果 */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 max-h-96 overflow-y-auto z-50 animate-fade-in">
          <div className="space-y-3">
            {results.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                onClick={handleResultClick}
                className="block p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h3 className="text-white font-medium mb-1">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-white/70 text-sm line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center mt-2 text-xs text-white/50">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.tags.slice(0, 2).join(', ')}</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 无结果提示 */}
      {isOpen && query.trim() !== '' && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 z-50 animate-fade-in">
          <div className="text-center text-white/60">
            <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>未找到相关文章</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 简化的搜索组件，用于导航栏
export function SearchIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-white/80 hover:text-white transition-colors p-2"
      title="搜索"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  );
}
