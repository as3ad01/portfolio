'use client';

import { motion } from 'framer-motion';
import { Code, Database, Layout, Cloud, CheckCircle, Zap, Users, Server, Clock, Layers, Rocket } from 'lucide-react';
import GradientText from '../ui/GradientText';

const services = [
  {
    title: "Setup & Planning",
    description: "Initial project setup and planning phase, including environment configuration and project structure.",
    icon: Clock,
    color: 'from-blue-500/20 to-cyan-400/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    duration: "1 Week",
    details: [
      "Project initialization",
      "Environment setup",
      "Development workflow configuration",
      "Team alignment and planning"
    ]
  },
  {
    title: "Architecture & Design",
    description: "Comprehensive architecture planning and UI/UX design using our custom component library.",
    icon: Layers,
    color: 'from-indigo-500/20 to-violet-400/20',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    duration: "2 Weeks",
    details: [
      "System architecture design",
      "Database schema planning",
      "UI/UX design with our component library",
      "API endpoint planning"
    ]
  },
  {
    title: "Development Phase",
    description: "Efficient development using Next.js, Tailwind CSS, and our custom UI component library.",
    icon: Code,
    color: 'from-blue-500/20 to-blue-400/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    duration: "4-6 Weeks",
    details: [
      "Frontend with Next.js & Tailwind CSS",
      "Custom UI components integration",
      "Firebase for database & storage",
      "Zustand for state management"
    ]
  },
  {
    title: "Deployment & Testing",
    description: "Seamless deployment to Vercel for client-dev testing and feedback integration.",
    icon: Rocket,
    color: 'from-indigo-500/20 to-violet-400/20',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    duration: "1 Week",
    details: [
      "Vercel deployment",
      "Client-dev testing",
      "Performance optimization",
      "Feedback integration"
    ]
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
            Our <GradientText text="Process" className="font-bold" />
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl text-shadow-sm">
            A streamlined approach to software development, leveraging our custom UI component library and modern tech stack for efficient delivery.
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
                    
                    <div className="px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/80">
                      {service.duration}
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${service.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 mb-6">
                    {service.description}
                  </p>
                  
                  {/* Feature list */}
                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-white/70 group-hover:text-white/90 transition-colors">
                        <CheckCircle size={16} className="mr-2 text-blue-400/80" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/5"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Our Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="text-white/60 text-sm">Frontend</h4>
              <p className="text-white/90">Next.js</p>
              <p className="text-white/90">Tailwind CSS</p>
              <p className="text-white/90">Custom UI Library</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white/60 text-sm">State Management</h4>
              <p className="text-white/90">Zustand</p>
              <p className="text-white/90">Server Actions</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white/60 text-sm">Backend & Storage</h4>
              <p className="text-white/90">Firebase</p>
              <p className="text-white/90">Server Actions</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white/60 text-sm">Deployment</h4>
              <p className="text-white/90">Vercel</p>
              <p className="text-white/90">Client-Dev Testing</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 