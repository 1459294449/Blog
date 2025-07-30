'use client';

import React, { useState, useEffect } from 'react';
import { extractHeadingsFromHTML, scrollToElement, addHeadingIds } from '@/utils/headingUtils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 等待DOM渲染完成后再生成目录
    const timer = setTimeout(() => {
      // 首先从HTML内容中提取标题信息
      const items = extractHeadingsFromHTML(content);

      // 然后确保DOM中的标题元素有对应的ID
      const articleContent = document.querySelector('.article-content');
      if (articleContent) {
        addHeadingIds(articleContent);
      }

      setTocItems(items);
      console.log('TOC items generated:', items); // 调试日志
    }, 200); // 给DOM更多时间来渲染

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    // 使用简化的滚动检测来避免TypeScript问题
    const handleScroll = () => {
      const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6');
      let currentActiveId = '';
      let closestDistance = Infinity;

      // 获取页面顶部偏移量（考虑固定头部）
      const headerOffset = 120;

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top - headerOffset);

        // 如果标题在视口中且距离目标位置最近
        if (rect.top <= headerOffset + 50 && rect.bottom >= 0 && distance < closestDistance) {
          closestDistance = distance;
          currentActiveId = (heading as HTMLElement).id;
        }
      });

      setActiveId(currentActiveId);
    };

    // 使用节流优化性能
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    console.log('TOC: Attempting to scroll to:', id);

    // 添加点击反馈
    const clickedElement = document.querySelector(`[data-toc-id="${id}"]`);
    if (clickedElement) {
      clickedElement.classList.add('toc-item-clicked');
      setTimeout(() => {
        clickedElement.classList.remove('toc-item-clicked');
      }, 300);
    }

    // 立即更新激活状态（提供即时反馈）
    setActiveId(id);

    // 首先尝试简单的测试滚动
    console.log('Testing simple scroll...');

    // 测试1: 直接查找元素
    const targetElement = document.getElementById(id);
    if (targetElement) {
      console.log('Found target element:', targetElement);
      console.log('Element position:', targetElement.getBoundingClientRect());

      // 尝试最简单的滚动方法
      try {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.log('scrollIntoView called successfully');
      } catch (error) {
        console.error('scrollIntoView failed:', error);

        // 备用方法：直接设置滚动位置
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - 120;
        window.scrollTo(0, scrollTop);
      }
    } else {
      console.error('Target element not found, available elements:');
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      allHeadings.forEach((h, index) => {
        console.log(`${index}: id="${h.id}", text="${h.textContent?.slice(0, 30)}"`);
      });

      // 尝试使用我们的工具函数
      scrollToElement(id, 120);
    }

    // 在移动端滚动后隐藏目录
    if (isMobile) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // 键盘导航支持
  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToHeading(id);
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={`table-of-contents ${isMobile ? 'toc-mobile' : 'toc-desktop'} ${className}`}>
      {/* 切换按钮 */}
      <button
        onClick={toggleVisibility}
        className={`toc-toggle glass-card p-2 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110 ${isMobile ? 'mb-4' : ''}`}
        title={isVisible ? '隐藏目录' : '显示目录'}
        aria-label={isVisible ? '隐藏目录' : '显示目录'}
      >
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 目录内容 */}
      <div className={`toc-content transition-all duration-300 ${isVisible ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            文章目录
          </h3>

          <nav className="toc-nav" role="navigation" aria-label="文章目录">
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    data-toc-id={item.id}
                    className={`
                      toc-item block w-full text-left py-2 px-3 rounded text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50
                      ${activeId === item.id
                        ? 'text-white bg-white/25 font-medium border-l-2 border-white/50'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }
                    `}
                    style={{
                      paddingLeft: `${(item.level - 1) * 16 + 12}px`,
                      fontSize: `${Math.max(0.75, 0.9 - (item.level - 1) * 0.05)}rem`
                    }}
                    title={item.text}
                    aria-label={`跳转到 ${item.text}`}
                    tabIndex={0}
                  >
                    <span className="block truncate">
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

// 紧凑版目录组件
export function TableOfContentsCompact({ content }: { content: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const items = extractHeadingsFromHTML(content);
    setTocItems(items);
  }, [content]);

  const scrollToHeading = (id: string) => {
    scrollToElement(id, 120);
    setIsOpen(false);
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20"
      >
        目录
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 max-w-[90vw] glass-card p-3 rounded-lg z-50 shadow-xl">
          <ul className="space-y-1 max-h-80 overflow-y-auto toc-nav">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className="block w-full text-left py-2 px-3 rounded text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                  title={item.text}
                >
                  <span className="block truncate">
                    {item.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
