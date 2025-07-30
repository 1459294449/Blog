'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle' | 'elegant' | 'post';
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  glow = false
}: GlassCardProps) {
  const baseClasses = 'glass-card';

  const variantClasses = {
    default: '',
    strong: 'glass-card-strong',
    subtle: 'opacity-80',
    elegant: 'glass-card-elegant',
    post: 'glass-card-post'
  };

  const interactionClasses = [
    hover && 'hover:scale-105',
    glow && 'animate-glass-glow'
  ].filter(Boolean).join(' ');

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    interactionClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}

// 预设的卡片组件
export function WelcomeCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <GlassCard variant="strong" glow className={`p-8 text-center ${className}`}>
      {children}
    </GlassCard>
  );
}

export function NavigationCard({
  icon,
  title,
  description,
  className = ''
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <GlassCard
      className={`p-6 text-center nav-item ${className}`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-white/70">{description}</p>
      )}
    </GlassCard>
  );
}

export function ContentCard({ 
  title, 
  children, 
  className = '' 
}: { 
  title?: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <GlassCard variant="strong" hover = {false} className={`p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      )}
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </GlassCard>
  );
}
