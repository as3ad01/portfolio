import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GradientText from './GradientText';

// Project data
const projects = [
  {
    id: 'noted',
    title: 'Noted',
    images: [
      '/projects/Noted.png',
      '/projects/Noted-Mobile.png'
    ],
    demoUrl: 'https://www.figma.com/proto/lAtlGkqH7LH6ABHImpCYO7/Noted?page-id=0%3A1&node-id=4-17&viewport=137%2C777%2C0.15&t=vBXxH8Rrhai3iz8q-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4%3A17',
  },
  {
    id: 'kaari',
    title: 'Kaari',
    images: [
      '/projects/Kaari.png',
      '/projects/Kaari-Mobile.png'
    ],
    demoUrl: 'https://kaari-monorepo.vercel.app',
  },
  {
    id: 'piyol',
    title: 'Piyol',
    images: [
      '/projects/Piyol.png'
    ],
    demoUrl: 'https://piyolkozmetik.com.tr',
  },
  {
    id: 'trading-journal',
    title: 'Trading Journal',
    images: [
      '/projects/Trading-Journal.png'
    ],
    demoUrl: 'https://trading-journal-o73x.vercel.app/',
  },
  {
    id: 'soto',
    title: 'Soto',
    images: [
      '/projects/Soto.png'
    ],
    demoUrl: 'https://www.figma.com/proto/OZreKbxJS3CnkQe9ccJwZZ/SOTO-Sushi-Menu?page-id=0%3A1&node-id=10-5520&starting-point-node-id=10%3A5520&t=qail1laUL2cJP9Jq-1',
  },
  {
    id: 'tandeem',
    title: 'Tandeem',
    images: [
      '/projects/Tandeem.png'
    ],
    demoUrl: 'https://app.tandeem.net/login',
  }
];

// Preload all project images
const preloadImages = () => {
  const imagePromises = projects.flatMap(project => 
    project.images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
  return Promise.all(imagePromises);
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative aspect-[16/9] rounded-[16px] overflow-hidden bg-black/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.2, ease: "easeInOut" },
              opacity: { duration: 0.15 }
            }}
            style={{
              filter: isHovered ? 'brightness(0.7)' : 'brightness(0.8)'
            }}
          />
        </AnimatePresence>
      </a>

      {/* Image navigation controls */}
      {project.images.length > 1 && (
        <>
          <motion.button
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/90 backdrop-blur-sm transition-all duration-300"
            onClick={prevImage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/90 backdrop-blur-sm transition-all duration-300"
            onClick={nextImage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default function BlocksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images when the component mounts
  useEffect(() => {
    preloadImages()
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Continue even if some images fail to load
      });
  }, []);

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight">
            Softwares we <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">made</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Clean designs, thoughtful user experiences, and solid architecture are at the heart of every project we build.
          </p>
        </motion.div>
        
        {/* Grid Container */}
        <AnimatePresence>
          {imagesLoaded && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 