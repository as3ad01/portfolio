'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: "Enterprise SaaS Platform",
    description: "A scalable SaaS solution for enterprise resource planning with real-time analytics.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/projects/project1.svg",
    fallbackImage: "/projects/project1.svg",
    link: "#"
  },
  {
    title: "Fintech Mobile App",
    description: "Cross-platform mobile app for personal finance management with AI-powered insights.",
    tech: ["React Native", "Firebase", "TensorFlow.js"],
    image: "/projects/project2.svg",
    fallbackImage: "/projects/project2.svg",
    link: "#"
  },
  {
    title: "E-commerce Redesign",
    description: "Complete redesign and performance optimization of a high-traffic e-commerce platform.",
    tech: ["Next.js", "GraphQL", "Tailwind CSS", "Redis"],
    image: "/projects/project3.svg",
    fallbackImage: "/projects/project3.svg",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            Featured Work
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            A selection of our most impactful projects delivered for clients across industries.
          </p>
        </motion.div>
        
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={index % 2 === 0 ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                </div>
              </div>
              
              <div className={index % 2 === 0 ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs inline-block py-1 px-2.5 border border-gray-700 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={project.link} 
                    className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    View Project Details
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 