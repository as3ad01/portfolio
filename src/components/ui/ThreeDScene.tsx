'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ThreeDSceneProps {
  variant?: 'grid' | 'particles' | 'sphere';
  className?: string;
}

export default function ThreeDScene({ variant = 'grid', className = '' }: ThreeDSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Grid effect implementation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    
    // Handle mouse movement for interactive effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX = (clientX / innerWidth) * 2 - 1;
      mouseY = (clientY / innerHeight) * 2 - 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Resize handler to keep canvas at correct size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create grid points
    const points: { x: number; y: number; baseX: number; baseY: number }[] = [];
    
    if (variant === 'grid') {
      const spacing = 50;
      const xCount = Math.ceil(canvas.width / spacing) + 1;
      const yCount = Math.ceil(canvas.height / spacing) + 1;
      
      for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
          points.push({
            x: x * spacing,
            y: y * spacing,
            baseX: x * spacing,
            baseY: y * spacing,
          });
        }
      }
    } else if (variant === 'particles') {
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
        });
      }
    } else if (variant === 'sphere') {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 4;
      const pointCount = 200;
      
      for (let i = 0; i < pointCount; i++) {
        // Generate points on a sphere surface using spherical coordinates
        const theta = Math.random() * Math.PI * 2; // azimuthal angle
        const phi = Math.acos(2 * Math.random() - 1); // polar angle
        
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.sin(phi) * Math.sin(theta);
        
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
        });
      }
    }
    
    // Render animation
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update point positions based on mouse movement
      points.forEach(point => {
        if (variant === 'grid') {
          point.x = point.baseX + mouseX * 15;
          point.y = point.baseY + mouseY * 15;
        } else if (variant === 'particles' || variant === 'sphere') {
          const dx = point.baseX - canvas.width / 2;
          const dy = point.baseY - canvas.height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Make points move away from or toward center based on mouse position
          const factor = variant === 'sphere' ? 20 : 5;
          point.x = point.baseX + mouseX * dx / distance * factor;
          point.y = point.baseY + mouseY * dy / distance * factor;
        }
      });
      
      // Draw connecting lines for grid effect
      if (variant === 'grid') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < points.length; i++) {
          const currentPoint = points[i];
          
          for (let j = i + 1; j < points.length; j++) {
            const comparePoint = points[j];
            const dx = currentPoint.x - comparePoint.x;
            const dy = currentPoint.y - comparePoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 70) { // Only connect nearby points
              ctx.beginPath();
              ctx.moveTo(currentPoint.x, currentPoint.y);
              ctx.lineTo(comparePoint.x, comparePoint.y);
              ctx.stroke();
            }
          }
        }
      } else if (variant === 'particles' || variant === 'sphere') {
        // Draw connections between nearby particles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < points.length; i++) {
          const currentPoint = points[i];
          
          for (let j = i + 1; j < points.length; j++) {
            const comparePoint = points[j];
            const dx = currentPoint.x - comparePoint.x;
            const dy = currentPoint.y - comparePoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxDistance = variant === 'sphere' ? 80 : 100;
            if (distance < maxDistance) {
              const opacity = 1 - distance / maxDistance;
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.05})`;
              ctx.beginPath();
              ctx.moveTo(currentPoint.x, currentPoint.y);
              ctx.lineTo(comparePoint.x, comparePoint.y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Draw points
      points.forEach(point => {
        let size = 1;
        if (variant === 'particles') size = 1.5;
        if (variant === 'sphere') size = 1.5;
        
        ctx.fillStyle = variant === 'grid' 
          ? 'rgba(255, 255, 255, 0.08)' 
          : 'rgba(255, 255, 255, 0.2)';
          
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
} 