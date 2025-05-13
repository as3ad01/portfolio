'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import GradientText from '../ui/GradientText';

export default function About() {
  return (
    <section id="about" className="py-36 relative overflow-hidden">
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
                <span className="inline-block">About</span> <GradientText text="Me" className="font-bold" />
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image
                src="/avatar-placeholder.jpg"
                alt="Mohamed Chams Eddine Lhouij"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Mohamed Chams Eddine Lhouij</h3>
              <p className="text-lg text-foreground/70 mb-4">Full Stack Software Developer</p>
              <div className="space-y-2 text-foreground/60">
                <p>🎓 Computer Engineering at TED University</p>
                <p>🌍 Moroccan, based in Ankara, Turkey</p>
                <p>🎂 23 years old</p>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/5"
          >
            <h4 className="text-xl font-semibold mb-4">Professional Journey</h4>
            <p className="text-foreground/70 leading-relaxed">
              As a passionate full-stack developer, I combine technical expertise with creative problem-solving to build innovative digital solutions. 
              My experience spans across modern web technologies, allowing me to create seamless and efficient applications that make a real impact.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <h5 className="font-medium mb-2">Education</h5>
                <p className="text-sm text-foreground/60">TED University</p>
                <p className="text-sm text-foreground/60">Computer Engineering</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <h5 className="font-medium mb-2">Location</h5>
                <p className="text-sm text-foreground/60">Ankara, Turkey</p>
                <p className="text-sm text-foreground/60">Originally from Morocco</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 