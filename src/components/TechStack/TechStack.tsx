'use client';

import { motion } from 'framer-motion';
import { 
  Code, Database, Globe, Server, PenTool
} from 'lucide-react';
import GradientText from '../ui/GradientText';

const technologies = [
  { name: 'Next.js', Icon: Globe, category: 'frontend' },
  { name: 'Tailwind CSS', Icon: PenTool, category: 'frontend' },
  { name: 'Node.js', Icon: Server, category: 'backend' },
  { name: 'Express.js', Icon: Server, category: 'backend' },
  { name: 'Firebase', Icon: Database, category: 'database' },
  { name: 'Prisma', Icon: Database, category: 'database' },
  { name: 'TypeScript', Icon: Code, category: 'languages' },
  { name: 'Java', Icon: Code, category: 'languages' }
];

const categories = [
  { name: 'Frontend', color: 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20', textColor: 'text-blue-400' },
  { name: 'Backend', color: 'bg-gradient-to-r from-emerald-500/20 to-teal-400/20', textColor: 'text-emerald-400' },
  { name: 'Database', color: 'bg-gradient-to-r from-orange-500/20 to-amber-400/20', textColor: 'text-orange-400' },
  { name: 'Languages', color: 'bg-gradient-to-r from-yellow-500/20 to-lime-400/20', textColor: 'text-yellow-400' }
];

// Function to get category color for a tech item
const getCategoryColor = (category: string) => {
  const foundCategory = categories.find(c => c.name.toLowerCase() === category);
  return foundCategory ? foundCategory.color : 'bg-gradient-to-r from-gray-500/20 to-slate-400/20';
};

// Function to get category text color for a tech item
const getCategoryTextColor = (category: string) => {
  const foundCategory = categories.find(c => c.name.toLowerCase() === category);
  return foundCategory ? foundCategory.textColor : 'text-gray-400';
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  hover: { 
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-36 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#070812] opacity-95"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/grid-pattern.svg')`,
          backgroundSize: '100px 100px',
          opacity: 0.4
        }}></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative mb-20">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
          
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-transparent px-8 mb-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                <span className="inline-block">Our</span> <GradientText text="Tech" className="font-bold" /> <span className="inline-block">Expertise</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground/70 max-w-2xl text-center text-lg"
            >
              We leverage cutting-edge technologies to build scalable, performant, and elegant digital solutions.
            </motion.p>
          </div>
        </div>
        
        {/* Tech categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`${category.color} rounded-lg p-3 text-center text-sm font-medium 
                backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all
                cursor-pointer hover:shadow-lg ${category.textColor}`}
            >
              {category.name}
            </motion.div>
          ))}
        </div>
        
        {/* Tech grid with hexagon-like cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {technologies.map((tech, index) => {
            const Icon = tech.Icon;
            const categoryColor = getCategoryColor(tech.category);
            const categoryTextColor = getCategoryTextColor(tech.category);
            
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                className="group"
              >
                <div className={`relative flex flex-col items-center p-4 ${categoryColor} 
                  rounded-xl border border-white/5 backdrop-blur-sm transition-all duration-300 
                  group-hover:border-white/20 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]`}
                >
                  <div className="mb-3 w-14 h-14 rounded-full flex items-center justify-center 
                    bg-black/20 backdrop-blur-sm border border-white/10 group-hover:border-white/20 
                    transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    <Icon size={24} className={categoryTextColor} />
                  </div>
                  
                  <span className={`font-medium text-sm transition-all duration-300 ${categoryTextColor}
                    group-hover:translate-y-1 group-hover:scale-110`}
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 