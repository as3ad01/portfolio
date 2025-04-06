'use client';

import React from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
}

export default function GradientText({ text, className = '' }: GradientTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
    >
      <span
        className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}
      >
        {text}
      </span>
    </span>
  );
} 