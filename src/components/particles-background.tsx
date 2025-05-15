import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Particle component with random properties
const Particle = ({ size, position, duration, delay }: {
  size: number, 
  position: { x: string, y: string }, 
  duration: number,
  delay: number
}) => {
  return (
    <motion.div
      className="absolute rounded-full bg-saffron-500 opacity-30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: position.x,
        top: position.y,
      }}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default function ParticlesBackground() {
  const particlesRef = useRef<JSX.Element[]>([]);
  
  useEffect(() => {
    // Create particles with random properties
    const particles = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      // Random size between 5px and 15px
      const size = Math.random() * 10 + 5;
      
      // Random position within the container
      const posX = `${Math.random() * 100}%`;
      const posY = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      
      particles.push(
        <Particle 
          key={i}
          size={size}
          position={{ x: posX, y: posY }}
          duration={duration}
          delay={delay}
        />
      );
    }
    
    particlesRef.current = particles;
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {particlesRef.current}
    </div>
  );
}
