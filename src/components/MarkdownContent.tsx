'use client';

import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '@/utils/paths';
import { addHeadingIds } from '@/utils/headingUtils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // 处理所有图片的路径
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('/images/')) {
          // 使用动态路径处理
          img.src = getAssetPath(src);
        }
      });

      // 为所有标题添加ID（用于目录导航）
      addHeadingIds(contentRef.current);
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
