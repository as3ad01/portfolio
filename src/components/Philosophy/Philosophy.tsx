'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import GradientText from '../ui/GradientText';
import ThreeDScene from '../ui/ThreeDScene';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const normalizedY = (clientY / innerHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  return (
    <section 
      id="philosophy" 
      className="relative py-20 md:py-40 overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* 3D background effects */}
      <ThreeDScene variant="sphere" className="z-0" />
      
      {/* Fixed background pattern */}
      <div className="absolute inset-0 bg-black opacity-95 z-0">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px',
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.1)`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>
      
      {/* Diagonal divider at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column: visual element */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-8 -left-8 w-full h-full border-2 border-accent/30 rounded-xl"
                style={{ 
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]),
                  rotate: useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]),
                  x: useTransform(() => mousePosition.x * -20),
                  y: useTransform(() => mousePosition.y * -20),
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-full h-full border-2 border-muted-purple/30 rounded-xl"
                style={{ 
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]),
                  rotate: useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]),
                  x: useTransform(() => mousePosition.x * 20),
                  y: useTransform(() => mousePosition.y * 20),
                }}
              />
              
              {/* Floating 3D shapes */}
              <motion.div
                className="absolute -right-16 -top-16 w-24 h-24 opacity-20 z-0"
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full border-2 border-accent/50 rounded-full" />
              </motion.div>
              
              <motion.div
                className="absolute -left-12 -bottom-12 w-16 h-16 opacity-20 z-0"
                animate={{
                  rotateX: [0, -360],
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full border-2 border-muted-purple/50 rotate-45" />
              </motion.div>
              
              {/* Main box with quote */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-muted-purple/10 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center p-12 shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
                style={{ 
                  opacity, 
                  scale,
                  rotateX: mousePosition.y * 10,
                  rotateY: mousePosition.x * 10,
                  transformStyle: 'preserve-3d',
                  transformPerspective: '1000px'
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              >
                <blockquote className="text-xl md:text-2xl font-light italic text-white">
                  "We don't just write code.<br />
                  <span className="font-normal not-italic">
                    <GradientText text="We architect solutions." />
                  </span>"
                </blockquote>
              </motion.div>
            </div>
          </div>
          
          {/* Right column: text content */}
          <div className="order-1 lg:order-2 text-gray-200">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
              style={{ 
                opacity,
                y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])
              }}
            >
              We are a collective of engineers shaping the future.
            </motion.h2>
            
            <div className="space-y-8 text-lg md:text-xl leading-relaxed">
              <motion.p
                style={{ 
                  opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]),
                  y: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [50, 0, 0, -50]),
                  transformStyle: 'preserve-3d',
                  z: useTransform(() => mousePosition.x * 20)
                }}
              >
                We architect infrastructure and engineer clarity. Our approach combines technical mastery with a relentless focus on user experience.
              </motion.p>
              
              <motion.p
                style={{ 
                  opacity: useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]),
                  y: useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [50, 0, 0, -50]),
                  transformStyle: 'preserve-3d',
                  z: useTransform(() => mousePosition.x * -15)
                }}
              >
                Every line of code we write serves a purpose. We build systems that scale across teams, timezones, and traffic spikes. Our solutions are elegant, performant, and built to last.
              </motion.p>
              
              <motion.div
                className="pt-4"
                style={{ 
                  opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]),
                  y: useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [50, 0, 0, -50])
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <p className="text-2xl font-medium relative inline-block">
                    <GradientText text="We transform complex problems into intuitive experiences." />
                    <motion.span 
                      className="absolute -inset-1 -z-10 opacity-30 blur-lg bg-gradient-to-r from-accent to-muted-purple rounded-lg"
                      animate={{ 
                        opacity: [0.2, 0.3, 0.2],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    />
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Diagonal divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
} 