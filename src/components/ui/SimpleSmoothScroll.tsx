'use client';

import { ReactNode, useEffect } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SimpleSmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Add smooth scroll behavior using CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
} 