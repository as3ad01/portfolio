'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
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
  
  const [toast, setToast] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    const emailAddress = email.replace('mailto:', '');
    navigator.clipboard.writeText(emailAddress).then(() => {
      setToast('Copied');
      setTimeout(() => setToast(null), 1500);
    });
  };

  // Team members data
  const teamMembers = [
    {
      name: "Mohamed Chams Eddine Lhouij",
      title: "Full Stack Software Developer",
      image: "/icons/Default_pfp.svg.png",
      github: "https://github.com/chamsedd0",
      email: "mailto:lhouijchams@gmail.com"
    },
    {
      name: "Saif Ass'ad",
      title: "Full Stack Software Developer",
      image: "/icons/Default_pfp.svg.png",
      github: "https://github.com/as3ad01",
      email: "mailto:saifas3ad01@gmail.com"
    },
    {
      name: "Turan Myrzabekov",
      title: "UI/UX Designer",
      image: "/icons/Default_pfp.svg.png",
      github: null,
      email: "mailto:turanm1004@gmail.com"
    }
  ];

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
            text="About Us" 
            highlightWords={["Us"]} 
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
            Meet our team of passionate professionals.
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative group rounded-xl bg-gradient-to-br from-[#0c101d]/70 to-[#0f1424]/70 border border-white/5 p-8 min-h-[420px] h-full flex flex-col items-center transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:border-[rgba(59,130,246,0.2)] backdrop-blur-sm overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[10px]"></div>
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-accent/30 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-gradient-to-tr from-blue-500/10 to-purple-500/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-accent/60 transition-all duration-300"></div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-bold mb-1 text-center text-white drop-shadow-lg">{member.name}</h3>
                  <p className="text-base text-foreground/70 mb-4 text-center font-medium">{member.title}</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-black/60 to-accent/10 border border-white/10 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 group focus:outline-none transform hover:scale-110 hover:shadow-lg"
                      aria-label="GitHub"
                    >
                      <Github size={22} className="text-foreground/70 group-hover:text-accent transition-colors duration-300" />
                    </a>
                  )}
                  {member.email && (
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(member.email)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-black/60 to-accent/10 border border-white/10 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 group focus:outline-none transform hover:scale-110 hover:shadow-lg"
                      aria-label="Copy Email"
                    >
                      <Mail size={22} className="text-foreground/70 group-hover:text-accent transition-colors duration-300" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-black/90 text-white text-base shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </section>
  );
} 