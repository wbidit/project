import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import Particles from '@tsparticles/react';
import { loadFull } from "tsparticles"; // Changed from @tsparticles/engine to tsparticles
import type { Engine } from "tsparticles-engine"; // Changed type import

import Typewriter from 'typewriter-effect';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [particlesInit, setParticlesInit] = useState(false);

  useEffect(() => {
    // Just set to true since the actual initialization happens in the Particles component
    setParticlesInit(true);
  }, []);

  return (
    <div className="text-center relative font-extrabold font-['Poppins',sans-serif]">
      {/* Interactive Background */}
      <Particles 
        init={async (engine: Engine) => {
          await loadFull(engine);
        }}
        options={{
          particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2 }
          }
        }}
        className="absolute inset-0 -z-10"
      />
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        <motion.span
          animate={{ 
            textShadow: [
              "0 0 20px rgba(44, 62, 80, 0)",
              "0 0 20px rgba(44, 62, 80, 0.5)",
              "0 0 20px rgba(44, 62, 80, 0)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text hover:scale-105 transition-transform duration-300"
        >
          Bidit Raj
        </motion.span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <motion.p className="text-xl md:text-2xl text-dark-300 mb-8">
          <Typewriter
            options={{
              strings: ["UI/UX Designer", "Frontend Developer", "Creative Thinker"],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.p>
      </motion.div>
      
      <Tilt>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          href="#contact"
          className="relative inline-block px-8 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-50 rounded-md font-medium group overflow-hidden shadow-lg hover:shadow-xl backdrop-blur-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Get in Touch</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
          />
        </motion.a>
      </Tilt>
    </div>
  );
}