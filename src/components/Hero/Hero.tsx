'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Star, Code, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, useMemo } from 'react';
import GradientText from '../ui/GradientText';
import ThreeDScene from '../ui/ThreeDScene';
import Image from 'next/image';

const AnimatedWord = ({ children, index = 0, highlighted = false, delay = 0 }: { 
  children: React.ReactNode; 
  index?: number; 
  highlighted?: boolean; 
  delay?: number 
}) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: delay + (0.1 * index)
      }}
    >
      {highlighted ? (
        <GradientText text={String(children)} className="font-bold" />
      ) : (
        children
      )}
      {' '}
    </motion.span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Initialize all state at the top level
  const [stars, setStars] = useState<{x: number, y: number, scale: number, opacity: number}[]>([]);
  
  // Pre-calculate transform values for orbs
  const orb1X = useTransform(() => mousePosition.x * -30);
  const orb1Y = useTransform(() => mousePosition.y * -30);
  const orb2X = useTransform(() => mousePosition.x * -20);
  const orb2Y = useTransform(() => mousePosition.y * -20);
  
  // Pre-calculate transform values for shapes
  const shape1X = useTransform(() => mousePosition.x * 10);
  const shape1Y = useTransform(() => mousePosition.y * 10);
  const shape2X = useTransform(() => mousePosition.x * -15);
  const shape2Y = useTransform(() => mousePosition.y * -15);
  
  // Create memoized stars with pre-calculated transforms
  const starsWithTransforms = useMemo(() => {
    return stars.map((star, i) => {
      return {
        ...star,
        xTransform: mousePosition.x * -10 * star.scale,
        yTransform: mousePosition.y * -10 * star.scale,
      };
    });
  }, [stars, mousePosition]);
  
  // Combine the two useEffect hooks into one to maintain consistent order
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Generate random stars
    const newStars = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setStars(newStars);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x: normalizedX, y: normalizedY });
    };
    
    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create animated background with particles
    const container = containerRef.current;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-accent/10 backdrop-blur-sm';
      
      // Randomize size (3-12px)
      const size = Math.random() * 9 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Randomize position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Randomize animation duration (15-30s)
      const duration = Math.random() * 15 + 15;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      
      // Add particle to container
      container.appendChild(particle);
      
      // Remove particle after some time
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };
    
    // Create initial particles - reduced number for better performance
    for (let i = 0; i < 8; i++) {
      createParticle();
    }
    
    // Add new particles periodically
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createParticle();
      }
    }, 3000);
    
    // Clean up all event listeners and intervals
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // Animated text for the headline
  const headlineWords = "Building the future of the web".split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-[#07080d]" ref={containerRef}>
      {/* Dark overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080d]/90 via-[#07080d]/70 to-[#07080d]/90 z-0"></div>
      
      {/* Star field background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {starsWithTransforms.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: '2px',
              height: '2px',
              opacity: star.opacity,
              scale: star.scale,
              x: star.xTransform,
              y: star.yTransform,
            }}
            animate={{
              scale: [star.scale, star.scale * 1.5, star.scale],
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
      
      {/* 3D Grid effect */}
      <ThreeDScene variant="grid" className="z-0" />
      
      {/* Animated glowing orbs with parallax effect - toned down */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] animate-pulse z-0"
        style={{ 
          x: orb1X,
          y: orb1Y,
          top: '30%',
          right: '25%',
        }}
      />
      
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full bg-muted-purple/3 blur-[80px] animate-pulse z-0"
        style={{ 
          x: orb2X,
          y: orb2Y,
          bottom: '30%',
          left: '25%',
          animationDelay: '1s'
        }}
      />
      
      {/* Content container with parallax scroll effect */}
      <motion.div 
        className="max-w-4xl mx-auto flex flex-col items-center text-center z-10 relative"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="glass-card px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs font-medium text-white">Modern Technology Solutions</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-6 perspective"
        >
          <motion.h1 
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight mb-6 preserve-3d text-white"
            style={{ 
              transform: `perspective(1000px) 
                          rotateX(${mousePosition.y * 3}deg) 
                          rotateY(${mousePosition.x * 3}deg)`
            }}
          >
            {headlineWords.map((word, index) => (
              <AnimatedWord 
                key={index} 
                index={index} 
                highlighted={word === "Building"} 
                delay={0.5}
              >
                {word}
              </AnimatedWord>
            ))}
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-light text-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Crafting exceptional digital experiences with <span className="text-accent font-normal">modern technology</span> and <span className="text-muted-purple font-normal">timeless design</span> principles.
        </motion.p>
        
        {/* Floating tech icons */}
        <motion.div
          className="flex justify-center mb-12 space-x-8 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}>
            <Code size={20} className="hover:text-accent transition-colors duration-300" />
          </motion.div>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hover:text-muted-purple transition-colors duration-300">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </motion.div>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-accent transition-colors duration-300">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-5"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="#philosophy"
              className="btn-primary shadow-lg"
            >
              Explore our work
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="#contact"
              className="btn-secondary shadow-md"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
        
        {/* 3D floating shapes with parallax - reduced opacity and subtler */}
        <div className="absolute left-[15%] top-[30%] z-0 opacity-10">
          <motion.div
            className="w-24 h-24 border border-accent/30 rounded-lg"
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              x: shape1X,
              y: shape1Y,
              transformStyle: 'preserve-3d'
            }}
          />
        </div>
        
        <div className="absolute right-[15%] bottom-[30%] z-0 opacity-10">
          <motion.div
            className="w-32 h-32 border border-muted-purple/30 rounded-full"
            animate={{
              rotateX: [0, -360],
              rotateY: [0, -360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              x: shape2X,
              y: shape2Y,
              transformStyle: 'preserve-3d'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
} 