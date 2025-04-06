'use client';

import { Github, Linkedin, Mail, Twitter, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import GradientText from '../ui/GradientText';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailHovered, setEmailHovered] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your server
    setFormSubmitted(true);
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Reset form status after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername' },
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
          {/* Left column: Contact form */}
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
                Have a project in mind or want to discuss potential collaborations? Reach out to us.
              </p>
              
              <div>
                <div 
                  className="inline-flex items-center transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                >
                  <div className="mr-4 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-white/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email us directly</p>
                    <a 
                      href="mailto:hello@yourdomain.com" 
                      className="text-white hover:text-accent transition-colors flex items-center"
                    >
                      hello@yourdomain.com
                      <motion.div
                        animate={{ x: emailHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm text-gray-400">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm text-gray-400">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm text-gray-400">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-200"
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-accent to-muted-purple rounded-lg font-medium hover:shadow-[0_5px_30px_rgba(14,165,233,0.3)] transition-all duration-300 flex items-center"
                >
                  {formSubmitted ? 'Message Sent!' : 'Send Message'}
                  {!formSubmitted && (
                    <ArrowRight className="ml-2 w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.form>
          </div>
          
          {/* Right column: Navigation, social links */}
          <div className="lg:pl-12">
            <div className="grid grid-cols-2 gap-8 mb-16">
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
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-6">
                  <GradientText text="Resources" className="font-semibold" />
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://blog.yourdomain.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      Blog
                      <ExternalLink className="ml-2 w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      Case Studies
                      <ExternalLink className="ml-2 w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Open Source
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-6">
                <GradientText text="Connect" className="font-semibold" />
              </h3>
              <div className="flex space-x-5 mb-12">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 hover:text-accent transition-all duration-300 group"
                      whileHover={{ y: -5 }}
                      aria-label={social.name}
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
              &copy; {currentYear} Your Name. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="mx-2">•</span>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted-purple/5 rounded-full blur-[150px] -z-10"></div>
      </div>
    </footer>
  );
} 