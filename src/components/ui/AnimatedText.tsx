import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import GradientText from './GradientText';

interface AnimatedTextProps {
  text: string;
  highlightWords?: string[];
  delay?: number;
  className?: string;
  variant?: 'heading' | 'subheading' | 'paragraph';
  animation?: 'typewriter' | 'float' | 'reveal' | 'highlight';
}

export default function AnimatedText({
  text,
  highlightWords = [],
  delay = 0,
  className = "",
  variant = 'heading',
  animation = 'float'
}: AnimatedTextProps) {
  
  // Split text into words for animation
  const words = text.split(' ');
  
  // Variants for word animations
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * 0.5 }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const typewriterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  };
  
  const typewriterChild = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const revealVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: delay
      }
    }
  };
  
  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: delay
      }
    }
  };
  
  const getWordElement = (word: string, index: number): ReactNode => {
    const isHighlighted = highlightWords.includes(word) || 
      highlightWords.some(hw => word.includes(hw));
    
    // Get base styling for variant
    let variantStyles = "inline-block";
    switch(variant) {
      case 'heading':
        variantStyles += " text-3xl sm:text-4xl md:text-5xl font-bold";
        break;
      case 'subheading':
        variantStyles += " text-xl sm:text-2xl md:text-3xl font-semibold";
        break;
      case 'paragraph':
        variantStyles += " text-base";
        break;
    }
    
    if (isHighlighted) {
      return (
        <motion.span
          key={index}
          variants={animation === 'highlight' ? highlightVariants : child}
          className={`inline-block ${variantStyles}`}
          custom={index}
        >
          <GradientText text={word} className="font-bold" />
          <span className="inline-block">&nbsp;</span>
        </motion.span>
      );
    }
    
    return (
      <motion.span
        key={index}
        variants={animation === 'typewriter' ? typewriterChild : 
                 animation === 'reveal' ? revealVariants : child}
        className={`inline-block ${variantStyles}`}
        custom={index}
      >
        {word}&nbsp;
      </motion.span>
    );
  };
  
  // Get the appropriate motion component based on variant
  const MotionTag = (props: any) => {
    switch(variant) {
      case 'heading':
        return <motion.h2 {...props} />;
      case 'subheading':
        return <motion.h3 {...props} />;
      case 'paragraph':
        return <motion.p {...props} />;
      default:
        return <motion.div {...props} />;
    }
  };
  
  // Float animation component
  if (animation === 'float') {
    return (
      <MotionTag
        className={`inline-block overflow-hidden ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        {words.map((word, index) => getWordElement(word, index))}
      </MotionTag>
    );
  }
  
  // Typewriter animation
  if (animation === 'typewriter') {
    return (
      <MotionTag
        className={`inline-block ${className}`}
        variants={typewriterContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => getWordElement(word, index))}
      </MotionTag>
    );
  }
  
  // Reveal animation (slides up)
  if (animation === 'reveal') {
    return (
      <MotionTag
        className={`inline-block overflow-hidden ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => getWordElement(word, index))}
      </MotionTag>
    );
  }
  
  // Highlight animation (scale and highlight words)
  if (animation === 'highlight') {
    return (
      <MotionTag
        className={`inline-block overflow-hidden ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => getWordElement(word, index))}
      </MotionTag>
    );
  }
  
  // Default fallback
  return (
    <div className={className}>
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word);
        return isHighlighted ? (
          <span key={index} className="inline-block">
            <GradientText text={word} />
            <span className="inline-block">&nbsp;</span>
          </span>
        ) : (
          <span key={index} className="inline-block">
            {word}&nbsp;
          </span>
        );
      })}
    </div>
  );
} 