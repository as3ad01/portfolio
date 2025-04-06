'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import GradientText from '../ui/GradientText';
import AnimatedText from '../ui/AnimatedText';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import ThreeDScene from '../ui/ThreeDScene';

const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Lead Engineer',
    bio: 'Specialized in architecture and performance optimization.',
    image: '/team/member1.png',
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    }
  },
  {
    name: 'Samantha Wu',
    role: 'UI/UX Engineer',
    bio: 'Creating exceptional user experiences with attention to detail.',
    image: '/team/member2.png',
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    }
  },
  {
    name: 'Marcus Johnson',
    role: 'Backend Developer',
    bio: 'Expert in API design and database optimization.',
    image: '/team/member3.png',
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    }
  },
  {
    name: 'Amara Robinson',
    role: 'Creative Director',
    bio: 'Bringing visions to life through creative direction and design systems.',
    image: '/team/member4.png',
    socials: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    }
  }
];

// Mission points data
const missionPoints = [
  {
    rank: "1st",
    title: "Enable quicker expansion",
    description: "of innovation from concept to market."
  },
  {
    rank: "2nd",
    title: "Enable creators to be heard",
    description: "in the current information overload."
  },
  {
    rank: "3rd",
    title: "Enable people to fall in love",
    description: "with the process of creation."
  }
];

interface TeamCardProps {
  member: typeof teamMembers[0];
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative bg-gradient-to-br from-background to-black/80 border border-white/5 rounded-xl overflow-hidden h-full"
        animate={{
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -5 : 0,
          boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.3)' : '0 0 0 rgba(0,0,0,0)',
          borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Glowing background on hover - simplified */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent/5 to-muted-purple/5 opacity-0 -z-10"
          animate={{ opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Main content */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
            {/* Team member image with animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/40 to-muted-purple/40 mix-blend-overlay opacity-0 z-10"
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 bg-gray-800" />
            
            {/* Name and role at bottom of image - simplified animation */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-xl font-bold text-white transform transition-transform duration-200" 
                  style={{ transform: isHovered ? 'translateY(-3px)' : 'translateY(0)' }}>
                {member.name}
              </h3>
              <p className="text-white/70 transform transition-transform duration-200"
                 style={{ transform: isHovered ? 'translateY(-3px)' : 'translateY(0)' }}>
                {member.role}
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-foreground/70 mb-6 text-sm">{member.bio}</p>
            
            {/* Social links - lighter animations */}
            <div className="flex space-x-3">
              {Object.entries(member.socials).map(([platform, link], i) => {
                let Icon;
                switch (platform) {
                  case 'github': Icon = Github; break;
                  case 'linkedin': Icon = Linkedin; break;
                  case 'twitter': Icon = Twitter; break;
                  default: Icon = Github;
                }
                
                return (
                  <motion.a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 
                             hover:bg-white/10 hover:border-accent/30 hover:text-accent transition-colors duration-200"
                    whileHover={{ y: -3, scale: 1.05, transition: { duration: 0.15 } }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
      {/* Background styling */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070812] via-[#080915] to-[#070812]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/grid-pattern.svg')`,
          backgroundSize: '100px 100px',
          opacity: 0.3
        }}></div>
      </div>
      
      {/* 3D animated particles */}
      <ThreeDScene variant="particles" className="z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y }}
        >
          <AnimatedText 
            text="Our Mission" 
            highlightWords={["Mission"]} 
            animation="float" 
            variant="heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
          />
          <motion.p 
            className="text-foreground/70 max-w-3xl mx-auto text-lg md:text-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Changing the world in three key ways
          </motion.p>
        </motion.div>
        
        {/* Enhanced Mission points - optimized animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {missionPoints.map((item, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm 
                      border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {/* Simplified glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 
                group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-sm"></div>
              
              <div className="mb-6 text-center">
                <span className="text-5xl font-bold inline-block">
                  <GradientText text={item.rank} className="font-bold" />
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center text-white">{item.title}</h3>
              <p className="text-white/70 text-center">{item.description}</p>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-0 right-0 w-20 h-20 rounded-tr-xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 blur-sm"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-20 h-20 rounded-bl-xl bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 blur-sm"></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mb-16"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]) }}
        >
          <AnimatedText 
            text="Meet Our Team" 
            highlightWords={["Team"]} 
            animation="typewriter" 
            variant="subheading"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          <motion.p 
            className="text-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            We're a diverse team of talented individuals dedicated to creating exceptional experiences.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
        
        
      </div>
    </section>
  );
} 