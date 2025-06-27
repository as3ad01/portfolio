'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'About Us', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-md bg-black/50' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="#">
          <div className="relative">
            <Image
              src="/LogoPixel.svg"
              alt="Mohamed Chams Eddine Lhouij"
              width={102}
              height={22}
              className="h-6 w-auto"
            />
            {/* Animated glow effect */}
            <motion.div 
              className="absolute -inset-1 rounded-full bg-accent/20 blur-md -z-10"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.9, 1.05, 0.9]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item, index) => (
            <Link 
              href={item.href} 
              key={item.name}
              className="relative px-4 py-2 text-sm transition-colors duration-300 rounded-md group hover:text-white"
            >
              <span className="relative z-10">{item.name}</span>
              
              {/* Hover effect */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-accent/80 to-muted-purple/80 rounded-md -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={false}
                layoutId="navHighlight"
                transition={{ 
                  type: 'spring', 
                  duration: 0.6, 
                  bounce: 0.15
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground focus:outline-none z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/90 backdrop-blur-lg md:hidden pt-20 px-4 flex flex-col z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-6 pt-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link 
                      href={item.href}
                      className="text-xl font-medium py-2 block border-b border-white/10 w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Mobile menu footer */}
              <motion.div 
                className="mt-auto pb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-white/50">© 2023 Portfolio</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 