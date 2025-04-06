'use client';

import { motion } from 'framer-motion';
import { Code, Database, Layout, Cloud, CheckCircle, Zap, Users, Server } from 'lucide-react';
import GradientText from '../ui/GradientText';

const services = [
  {
    title: "Web App Architecture",
    description: "We build ultra-performant frontend and backend stacks tailored for your specific needs.",
    icon: Layout,
    color: 'from-blue-500/20 to-cyan-400/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  {
    title: "API Development",
    description: "RESTful and GraphQL APIs designed with performance, security, and developer experience in mind.",
    icon: Code,
    color: 'from-indigo-500/20 to-violet-400/20',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400'
  },
  {
    title: "UI/UX Engineering",
    description: "Pixel-perfect implementations of complex interfaces with flawless interactions.",
    icon: Zap,
    color: 'from-blue-500/20 to-blue-400/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  {
    title: "DevOps & Infrastructure",
    description: "Cloud-native architectures using Kubernetes, Terraform, and modern CI/CD pipelines.",
    icon: Server,
    color: 'from-indigo-500/20 to-violet-400/20',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400'
  }
];


export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-[#060810] overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] bg-repeat"></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]"></div>
      
      {/* Dark overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/90 via-[#060810]/70 to-[#060810]/90 z-0"></div>
      
      {/* Content container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
            <GradientText text="Services" className="font-bold" /> <span>&amp; Expertise</span>
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl text-shadow-sm">
            We deliver end-to-end solutions with cutting-edge technology and best practices.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative rounded-xl bg-gradient-to-br from-[#0c101d]/70 to-[#0f1424]/70 border border-white/5 p-8 h-full transition-all duration-500 
                  hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:border-[rgba(59,130,246,0.2)]
                  backdrop-blur-sm"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[10px]`}>
                  </div>
                  
                  <div className="mb-6 flex justify-between items-start">
                    <div className={`w-16 h-16 ${service.textColor} rounded-xl bg-[#0c0f1a] shadow-lg
                      flex items-center justify-center ${service.borderColor}
                      group-hover:scale-110 transition-all duration-300`}>
                      <Icon size={28} className="group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="w-10 h-10 rounded-full bg-blue-500/10 backdrop-blur-sm opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${service.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Feature check marks */}
                  <ul className="mt-6 space-y-2">
                    {[1,2,3].map((item, i) => (
                      <li key={i} className="flex items-center text-white/70 group-hover:text-white/90 transition-colors">
                        <CheckCircle size={16} className="mr-2 text-blue-400/80" />
                        <span className="text-sm">Feature {item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        

      </div>
    </section>
  );
} 