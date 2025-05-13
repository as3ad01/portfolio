'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GradientText from '../ui/GradientText';
import AnimatedText from '../ui/AnimatedText';
import { Github, MapPin, GraduationCap, Globe, Calendar, Mail } from 'lucide-react';
import ThreeDScene from '../ui/ThreeDScene';

const socialLinks = {
  github: 'https://github.com/chamsedd0',
  email: 'mailto:lhouijchams@gmail.com'
};

const personalInfo = [
  { icon: Calendar, label: 'Age', value: '23 years old' },
  { icon: MapPin, label: 'Location', value: 'Ankara, Turkey' },
  { icon: Globe, label: 'Nationality', value: 'Moroccan' },
  { icon: GraduationCap, label: 'Education', value: 'TED University' }
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <section id="team" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070812] via-[#080915] to-[#070812]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/grid-pattern.svg')`,
          backgroundSize: '100px 100px',
          opacity: 0.3
        }}></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      
      {/* 3D animated particles */}
      <ThreeDScene variant="particles" className="z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-20"
          style={{ opacity, y }}
        >
          <AnimatedText 
            text="About Me" 
            highlightWords={["Me"]} 
            animation="float" 
            variant="heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          />
          <motion.p 
            className="text-foreground/70 max-w-3xl mx-auto text-xl md:text-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Full Stack Software Developer based in Ankara, Turkey
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Name and Title Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-12 border border-white/5 shadow-2xl 
                group-hover:border-white/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Mohamed Chams Eddine Lhouij
                </h3>
                <p className="text-2xl text-foreground/70">Full Stack Software Developer</p>
              </div>
            </motion.div>

            {/* Detailed Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Personal Info */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/5 hover:border-white/10 
                transition-all duration-500 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="text-2xl font-semibold mb-8 relative">Personal Information</h4>
                <div className="grid grid-cols-2 gap-8">
                  {personalInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div 
                        key={info.label}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5 text-blue-400" />
                          <p className="text-foreground/60 text-sm">{info.label}</p>
                        </div>
                        <p className="text-foreground/90 text-lg font-medium">{info.value}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bio */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/5 hover:border-white/10 
                transition-all duration-500 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="text-2xl font-semibold mb-6 relative">About</h4>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  Computer Engineering student at TED University with a passion for building innovative digital solutions. 
                  Combining technical expertise with creative problem-solving to create seamless and efficient applications.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/5 
                           hover:border-white/10 hover:bg-white/5 transition-all duration-500 shadow-2xl group"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Github size={28} className="text-foreground/70 group-hover:text-white transition-colors duration-300" />
                </motion.a>
                <motion.a
                  href={socialLinks.email}
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/5 
                           hover:border-white/10 hover:bg-white/5 transition-all duration-500 shadow-2xl group"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Mail size={28} className="text-foreground/70 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 