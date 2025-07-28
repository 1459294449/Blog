'use client';

import React, { useEffect, useState } from 'react';

interface SakuraEffectProps {
  enabled?: boolean;
  className?: string;
}

export default function SakuraEffect({ enabled = true, className = '' }: SakuraEffectProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let sakuraModule: any = null;

    const loadSakura = async () => {
      try {
        // 动态加载樱花特效脚本
        const script = document.createElement('script');
        script.src = '/js/sakura.js';
        script.onload = () => {
          if (window.sakura) {
            window.sakura.startSakura();
            setIsActive(true);
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load sakura effect:', error);
      }
    };

    loadSakura();

    return () => {
      if (window.sakura) {
        window.sakura.stopSakura();
        setIsActive(false);
      }
    };
  }, [enabled]);

  // 监听窗口大小变化，重新调整画布
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.getElementById('canvas_sakura') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null; // 这个组件不渲染任何内容，只是管理特效
}

// 樱花控制组件
export function SakuraToggle() {
  const [enabled, setEnabled] = useState(true);

  const toggleSakura = () => {
    if (enabled) {
      if (window.sakura) {
        window.sakura.stopSakura();
      }
    } else {
      if (window.sakura) {
        window.sakura.startSakura();
      }
    }
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={toggleSakura}
      className="glass-card p-2 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
      title={enabled ? '关闭樱花' : '开启樱花'}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {enabled ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  );
}

// 扩展 Window 接口以包含 sakura
declare global {
  interface Window {
    sakura?: {
      startSakura: () => void;
      stopSakura: () => void;
    };
  }
}
