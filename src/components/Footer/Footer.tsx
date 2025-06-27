'use client';

import { Github, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import GradientText from '../ui/GradientText';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailHovered, setEmailHovered] = useState<string | null>(null);
  
  const socialLinks = [
    { name: 'Mohamed Chams Eddine Lhouij GitHub', icon: Github, href: 'https://github.com/chamsedd0' },
    { name: "Saif Ass'ad GitHub", icon: Github, href: 'https://github.com/as3ad01' },
  ];

  return (
    <footer id="contact" className="relative bg-black text-white pb-12 overflow-hidden">
      {/* Top wave separator */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-background"/>
      <div className="absolute top-0 left-0 right-0 h-24">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full">
          <path 
            d="M0 120L40 114C80 108 160 96 240 90C320 84 400 84 480 78C560 72 640 60 720 54C800 48 880 48 960 54C1040 60 1120 72 1200 72C1280 72 1360 60 1400 54L1440 48V0H1400C1360 0 1280 0 1200 0C1120 0 1040 0 960 0C880 0 800 0 720 0C640 0 560 0 480 0C400 0 320 0 240 0C160 0 80 0 40 0H0V120Z" 
            fill="var(--background)"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column: Contact info */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <GradientText text="Let's Connect" className="font-bold" />
              </h2>
              <p className="text-gray-400 max-w-md mb-8">
                Have a project in mind or want to discuss potential collaborations? Reach out to me.
              </p>
              
              <div className="flex flex-col space-y-6">
                <div 
                  className="inline-flex items-center transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setEmailHovered('mohamed')}
                  onMouseLeave={() => setEmailHovered(null)}
                >
                  <div className="mr-4 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Mohamed Chams Eddine Lhouij</p>
                    <a 
                      href="mailto:lhouijchams@gmail.com" 
                      className="text-white hover:text-accent transition-colors flex items-center"
                    >
                      lhouijchams@gmail.com
                      <motion.div
                        animate={{ x: emailHovered === 'mohamed' ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </a>
                  </div>
                </div>
                <div 
                  className="inline-flex items-center transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setEmailHovered('saif')}
                  onMouseLeave={() => setEmailHovered(null)}
                >
                  <div className="mr-4 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Saif Ass'ad</p>
                    <a 
                      href="mailto:saifas3ad01@gmail.com" 
                      className="text-white hover:text-accent transition-colors flex items-center"
                    >
                      saifas3ad01@gmail.com
                      <motion.div
                        animate={{ x: emailHovered === 'saif' ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </a>
                  </div>
                </div>
                <div 
                  className="inline-flex items-center transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setEmailHovered('turan')}
                  onMouseLeave={() => setEmailHovered(null)}
                >
                  <div className="mr-4 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Turan Myrzabekov</p>
                    <a 
                      href="mailto:turanm1004@gmail.com" 
                      className="text-white hover:text-accent transition-colors flex items-center"
                    >
                      turanm1004@gmail.com
                      <motion.div
                        animate={{ x: emailHovered === 'turan' ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column: Navigation */}
          <div className="lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-6">
                <GradientText text="Navigation" className="font-semibold" />
              </h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#philosophy" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="#tech-stack" className="text-gray-400 hover:text-white transition-colors">Tech Stack</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <h3 className="text-lg font-semibold mb-6">
                <GradientText text="Connect" className="font-semibold" />
              </h3>
              <div className="flex space-x-5">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 hover:text-accent transition-all duration-300 group mx-2"
                      whileHover={{ y: -5 }}
                      aria-label={social.name}
                      title={social.name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Mohamed Chams Eddine Lhouij. All rights reserved.
            </p>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted-purple/5 rounded-full blur-[150px] -z-10"></div>
      </div>
    </footer>
  );
} 