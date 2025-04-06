import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, LayoutGroup } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import GradientText from './GradientText';

// Project data with static colors and guaranteed images
const projects = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with real-time inventory management.',
    // Using a single-color background as fallback
    bgColor: 'bg-blue-600',
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-2',
    height: 'row-span-1',
  },
  {
    id: 'project-2',
    title: 'Health Tracker App',
    description: 'Mobile application for tracking fitness goals, nutrition, and health metrics.',
    bgColor: 'bg-emerald-600',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
      'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2',
      'https://images.unsplash.com/photo-1594882645126-14020914d58d',
    ],
    techStack: ['React Native', 'Firebase', 'Apple HealthKit'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-1',
    height: 'row-span-2',
  },
  {
    id: 'project-3',
    title: 'AI Content Generator',
    description: 'AI-powered application that generates marketing copy, blog posts, and social media content.',
    bgColor: 'bg-purple-600',
    images: [
      'https://images.unsplash.com/photo-1677442135181-baff1c3c9551',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      'https://images.unsplash.com/photo-1684156818445-9e59fe6fca11',
    ],
    techStack: ['Python', 'TensorFlow', 'OpenAI API'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-1',
    height: 'row-span-1',
  },
  {
    id: 'project-4',
    title: 'Smart Home Dashboard',
    description: 'Centralized control system for IoT devices with voice commands and automation recipes.',
    bgColor: 'bg-amber-600',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827',
      'https://images.unsplash.com/photo-1581267852521-7b99edae7f3e',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6',
    ],
    techStack: ['Vue.js', 'WebSockets', 'MQTT'],
    demoUrl: 'https://example.com/demo', 
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-1',
    height: 'row-span-1',
  },
  {
    id: 'project-5',
    title: 'Crypto Trading Bot',
    description: 'Automated cryptocurrency trading system using technical analysis and machine learning.',
    bgColor: 'bg-cyan-600',
    images: [
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
      'https://images.unsplash.com/photo-1605792657660-596af9009e82',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    ],
    techStack: ['Python', 'TensorFlow', 'Docker'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-2',
    height: 'row-span-1',
  },
  {
    id: 'project-6',
    title: 'Educational Platform',
    description: 'Interactive learning platform with courses, quizzes, and progress tracking.',
    bgColor: 'bg-rose-600',
    images: [
      'https://images.unsplash.com/photo-1594312915251-48db9280c8f1',
      'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b',
      'https://images.unsplash.com/photo-1610484826967-09c5720778c7',
    ],
    techStack: ['React', 'GraphQL', 'MongoDB'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/username/project',
    width: 'col-span-1',
    height: 'row-span-2',
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const ProjectCard = ({ project, isExpanded, onToggle, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Preload current image
  useEffect(() => {
    const img = new Image();
    img.src = project.images[currentImageIndex];
    img.onload = () => setImageLoaded(true);

    return () => {
      img.onload = null;
    };
  }, [project.images, currentImageIndex]);

  // Navigate through images
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };
  
  // Animation variants
  const cardVariants = {
    normal: { 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    expanded: {
      scale: 1,
      zIndex: 40,
      transition: { duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }
    }
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`${project.width} h-full min-h-[280px]`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div 
        className={`w-full h-full relative cursor-pointer ${project.bgColor} transition-shadow duration-300 rounded-[16px] overflow-hidden`}
        variants={cardVariants}
        initial="normal"
        animate={isExpanded ? "expanded" : isHovered ? "hover" : "normal"}
        onClick={() => !isExpanded && onToggle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layoutId={`card-container-${project.id}`}
      >
        {/* Background image or color fallback */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          layoutId={`card-image-container-${project.id}`}
        >
          <AnimatePresence mode="wait">
            {imageLoaded ? (
              <motion.div 
                key={`image-${currentImageIndex}`}
                className={`w-full h-full bg-cover bg-center absolute inset-0 transition-all duration-500`}
                style={{ 
                  backgroundImage: `url(${project.images[currentImageIndex]})`,
                  filter: isExpanded ? 'brightness(0.15)' : isHovered ? 'brightness(0.7)' : 'brightness(0.8)'
                }}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            ) : (
              <div className={`${project.bgColor} w-full h-full opacity-80`}></div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Image navigation controls - visible on hover and when expanded */}
        {(isHovered || isExpanded) && project.images.length > 1 && (
          <>
            <motion.button
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white/80 backdrop-blur-sm transition-all duration-300"
              onClick={prevImage}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white/80 backdrop-blur-sm transition-all duration-300"
              onClick={nextImage}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </>
        )}
        
        {/* Close button - only shown when expanded */}
        {isExpanded && (
          <motion.button
            className="absolute top-4 right-4 z-50 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white/80 backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        )}
        
        {/* Pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
          <motion.div 
            className="flex gap-1.5 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.images.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIndex ? 'bg-white w-3' : 'bg-white/40'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(i);
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Project details - only shown when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2,
                staggerChildren: 0.1 
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                  {project.title}
                </h3>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <p className="text-white/80 text-sm md:text-base mb-4 max-w-xl">
                  {project.description}
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 }}
              >
                {project.techStack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
              
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.55 }}
              >
                <a 
                  href={project.demoUrl}
                  className="inline-flex items-center gap-1 text-white group"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-medium">View Project</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Project title - only shown when not expanded */}
        {!isExpanded && (
          <motion.div 
            className="absolute inset-0 flex items-end p-5 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-white font-medium text-lg md:text-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              {project.title}
            </h3>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function BlocksSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Handle escape key to collapse expanded project
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedId) {
        setExpandedId(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedId]);

  const toggleExpanded = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 md:py-28 relative bg-[#050507]"
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight">
            Our Featured <GradientText text="Projects" className="font-medium" />
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Clean designs, thoughtful user experiences, and solid architecture are at the heart of every project we build.
          </p>
        </motion.div>
        
        {/* Grid Container with 20px gap */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => toggleExpanded(project.id)}
                index={index}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
} 