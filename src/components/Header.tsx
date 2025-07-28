'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle, { ThemeToggleSimple } from './ThemeToggle';
import { SearchIcon } from './SearchBox';
import { SakuraToggle } from './SakuraEffect';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <nav className="glass-card px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-lg font-bold">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">MarkChin</h1>
              <p className="text-white/70 text-xs">技术博客</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              首页
            </Link>
            <Link
              href="/posts"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              文章
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              关于
            </Link>
            <Link
              href="/tags"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              标签
            </Link>

            {/* 搜索和主题切换 */}
            <div className="flex items-center space-x-2 ml-4">
              <SearchIcon onClick={() => setIsSearchOpen(!isSearchOpen)} />
              <SakuraToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchIcon onClick={() => setIsSearchOpen(!isSearchOpen)} />
            <SakuraToggle />
            <ThemeToggleSimple />
            <button
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/posts"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                文章
              </Link>
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
              <Link
                href="/tags"
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                标签
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
